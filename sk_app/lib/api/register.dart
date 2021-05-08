import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../models/Register.dart';

class RegisterAPI {
  Future<RegisterResponseModel> register(
      RegisterRequestModel requestModel) async {
      var url = Uri.parse("http://10.0.2.2:3000/api/register");
      final respe = await http.post(url, body: requestModel.toJson());
    // Map<String, dynamic> body = {"success": true, "error": null};
    // Map<String, dynamic> response = {"statusCode": 200, "body": body};
    if (response["statusCode"] == 200 || response["statusCode"] == 400) {
      final prefs = await SharedPreferences.getInstance();
      prefs.setString('email', requestModel.email);

      return Future.delayed(Duration(milliseconds: 4500)).then((onValue) =>
          RegisterResponseModel(
              success: response["body"]["success"].toString(),
              error: response["body"]["error"].toString()));
    } else {
      throw Exception('Failed to load data!');
    }
  }
}
