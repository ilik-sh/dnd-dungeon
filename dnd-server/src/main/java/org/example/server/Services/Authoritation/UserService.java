package org.example.server.Services.Authoritation;


import org.example.server.domain.Models.account.Role;
import org.example.server.domain.Models.account.User;
import org.example.server.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

//    public UserDetails signIn(SignInRequest request){
//        User user = (User) loadUserByEmail(request.getEmail());
//        if(bCryptPasswordEncoder().matches(request.getPassword(),user.getPassword())){
//            return user;
//        }else {
//            throw new UsernameNotFoundException("Incorrect password");
//        }
//    }

    public User findUserById(Long userId) {
        Optional<User> userFromDb = userRepository.findById(userId);
        return userFromDb.orElse(new User());
    }

    public List<User> allUsers() {
        return (List<User>) userRepository.findAll();
    }

    public User saveUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Такой юзер существует");
        }
        user.setRole(Role.ROLE_USER);
        user.setPassword(bCryptPasswordEncoder().encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean deleteUser(Long userId) {
        if (userRepository.findById(userId).isPresent()) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    public boolean findIfExistsByUsername(String username){
        return userRepository.existsByUsername(username);
    }

    public boolean findIfExistsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(
                ()->new UsernameNotFoundException("No such user: " + username));
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(
                ()->new UsernameNotFoundException("No such user: " + email));
    }

    public UserDetailsService userDetailsService() {
        return this::getByUsername;
    }
}