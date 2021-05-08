import 'package:app_usage/app_usage.dart';

class SendUsageResponseModel {
  final String success;
  final String error;

  SendUsageResponseModel({this.success, this.error});

  factory SendUsageResponseModel.fromJson(Map<String, dynamic> json) {
    return SendUsageResponseModel(
      success: json["success"] != null ? json["success"] : "",
      error: json["error"] != null ? json["error"] : "",
    );
  }
}

class SendUsageRequestModel {
  List<AppUsageInfo> data;

  SendUsageRequestModel({this.data});

  Map<String, dynamic> toJson() {
    Map<String, dynamic> map = {'data': this.data};

    return map;
  }
}
