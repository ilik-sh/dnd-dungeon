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
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    public User getUserById(String userId) {
        Optional<User> userFromDb = userRepository.findById(UUID.fromString(userId));
        return userFromDb.orElseThrow(()-> new UsernameNotFoundException("No such user: "+userId));
    }

    public List<User> findAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    public void saveUser(User user) {
        user.setRole(Role.ROLE_USER);
        user.setPassword(bCryptPasswordEncoder().encode(user.getPassword()));
        userRepository.save(user);
    }

    public boolean deleteUser(UUID userId) {
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

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Can't Find user"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(
                ()->new UsernameNotFoundException("No such user: " + username));
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(
                ()->new UsernameNotFoundException("No such email: " + email));
    }

    public UserDetailsService userDetailsService() {
        return this::getUserByUsername;
    }
}