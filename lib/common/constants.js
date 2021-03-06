/**
 * Created by XiTU on 3/18/14.
 */

exports.SPOTS_IMAGE_PATH = "/data/spots/images/";
exports.SPOTS_CONTENT_PATH = "/data/spots/content/";
exports.SPOTS_STATIC_URL_PREFIX = "/staticUrl/spots/";

exports.TYPE_NUMBER =  "NUMBER";
exports.TYPE_STRING =  "STRING";
exports.TYPE_DATE   =  "DATE";

exports.SESSION_HOURS = 2;  // session expires in 2 hour

exports.CONFIRM_CODE_LENGTH = 10;


exports.LOGIN_PROVIDER = {
    SYSTEM : "sctravel",
    FACEBOOK: "facebook"
}


exports.ORDER_STATUS = {
    BOOKED:"booked",
    PAID:"paid",
    CANCELLED:"cancelled",
    UNMATCHED:"unmatched"
}

exports.SKU_TYPE = {
   TICKETS: "T",
   ROUTES : "R"
}

exports.CALLBACK_SUCCESS="done";

exports.KEYWORDS_PLACE_HOLDER="{KEYWORDS_PLACE_HOLDER}";
//Product Types Constant
exports.PRODUCT_TYPES = {
    PACKAGE : 1,
    HOTEL : 2,
    FLIGHT : 3,
    SOUVENIR : 4
}

exports.url = "https://localhost:3000";