package org.example.server;

public enum AllConstants {;
    public enum StringConstants{
        DEFAULT_USERPROFILE_IMG("https://firebasestorage.googleapis.com/v0/b/dndhub-fb81c.appspot.com/o/defaults%2FuserProfileThumbnail.png?alt=media&token=a0b75353-052b-47e0-b5af-2c375f643eee"),
        DEFAULT_MAP_IMG("https://firebasestorage.googleapis.com/v0/b/dndhub-fb81c.appspot.com/o/defaults%2FmapThumbnail.png?alt=media&token=0ca8fb5d-1468-4e3c-b0fa-dd004a28ef49"),
        DEFAULT_MAP_NAME("Dungeon"),
        DEFAULT_ROOM_TEXTURE("https://firebasestorage.googleapis.com/v0/b/dndhub-fb81c.appspot.com/o/defaults%2Ftexture.webp?alt=media&token=6921b28b-cb55-4f6d-8430-94e12c38919e");

        private final String value;
        StringConstants(String s){
            value = s;
        }
        public String getValue(){
            return value;
        }
    }
    public enum IntegerConstants {
        MAX_MAPVIEW_AMOUNT_ON_PAGE(10),
        MAX_ROOM_LEVEL(5);


        private final int value;
        IntegerConstants(int i) {
            value = i;
        }

        public int getValue(){
            return value;
        }
    }
}
