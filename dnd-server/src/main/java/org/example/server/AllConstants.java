package org.example.server;

public enum AllConstants {;

    public enum IntegerConstants {
        MAX_ROOM_LEVEL(5);

        private int value;
        IntegerConstants(int i) {
            value = i;
        }

        public int getValue(){
            return value;
        }
    }
}
