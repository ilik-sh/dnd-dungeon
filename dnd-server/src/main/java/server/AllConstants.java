package server;

public enum AllConstants {;

    public enum IntegerConstants {
        MAX_MAP_WIDTH(9),
        MAX_MAP_HEIGHT(8),
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
