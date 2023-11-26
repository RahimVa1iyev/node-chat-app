const mongoose = require("mongoose");

// Kullanıcı Şeması (userSchema): mongoose.Schema kullanarak, kullanıcı nesnesinin hangi özelliklere sahip olacağını tanımlıyoruz.
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, minlength: 3, maxlength: 30 },
        email: { type: String, require: true, minlength: 3, maxlength: 200, unique: true },
        password: { type: String, require: true, minlength: 3, maxlength: 1024 },
    },
    {
        // belgelerin oluşturulma ve güncelleme tarihini izlemek için 
        timestamps: true, 
    }
);

//  Şemayı kullanarak bir model oluşturuyoruz
const userModel = mongoose.model("User",userSchema);
// Modeli Dışa Aktarma: 
module.exports = userModel;