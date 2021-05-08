import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/SendUsage.dart';

class SendUsageAPI {
  Future<SendUsageResponseModel> register(
      SendUsageRequestModel requestModel) async {
    var url = Uri.parse("https://10.0.2.2:3000/api/report");

    final response = await http.post(url, body: requestModel.toJson());
    if (response.statusCode == 200 || response.statusCode == 400) {
      return SendUsageResponseModel.fromJson(
        json.decode(response.body),
      );
    } else {
      throw Exception('Failed to load data!');
    }
  }
}
