package server;

public enum AllConstants {;

    public enum IntegerConstants {
        MAX_MAP_WIDTH(7),
        MAX_MAP_HEIGHT(7),
        MAX_ROOM_LEVEL(5),
        TUNNEL_DIVIDING_CHANCE(65);

        private int value;
        IntegerConstants(int i) {
            value = i;
        }

        public int getValue(){
            return value;
        }
    }
}
