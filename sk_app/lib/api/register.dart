import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../models/Register.dart';

class RegisterAPI {
  Future<RegisterResponseModel> register(
      RegisterRequestModel requestModel) async {
    var url = Uri.parse("https://10.0.2.2:5000/api/register");
    final response = await http.post(url, body: requestModel.toJson());
    if (response.statusCode == 200 || response.statusCode == 400) {
      final prefs = await SharedPreferences.getInstance();
      prefs.setString('email', requestModel.email);

      return RegisterResponseModel.fromJson(
        json.decode(response.body),
      );
    } else {
      throw Exception('Failed to load data!');
    }
  }
}
