class RegisterResponseModel {
  final String success;
  final String error;

  RegisterResponseModel({this.success, this.error});

  factory RegisterResponseModel.fromJson(Map<String, dynamic> json) {
    return RegisterResponseModel(
      success: json["success"] != null ? json["success"] : "",
      error: json["error"] != null ? json["error"] : "",
    );
  }
}

class RegisterRequestModel {
  String email;
  String password;

  RegisterRequestModel({
    this.email,
    this.password,
  });

  Map<String, dynamic> toJson() {
    Map<String, dynamic> map = {
      'email': email.trim(),
      'password': password.trim(),
    };

    return map;
  }
}
