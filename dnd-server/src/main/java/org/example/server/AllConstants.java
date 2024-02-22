package org.example.server;

public enum AllConstants {;

    public enum IntegerConstants {
        MAX_MAP_WIDTH(7),
        MAX_MAP_HEIGHT(7),
        MAX_ROOM_LEVEL(5),
        MAX_TUNNEL_LENGTH(4);

        private int value;
        IntegerConstants(int i) {
            value = i;
        }

        public int getValue(){
            return value;
        }
    }
}
