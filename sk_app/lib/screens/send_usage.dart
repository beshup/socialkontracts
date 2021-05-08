import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:app_usage/app_usage.dart';
import 'package:sk_app/api/send_usage.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sk_app/models/SendUsage.dart';

import '../ProgressHUD.dart';

class SendUsagePage extends StatefulWidget {
  @override
  _SendUsagePageState createState() => _SendUsagePageState();
}

class _SendUsagePageState extends State<SendUsagePage> {
  List<AppUsageInfo> _infos = [];

  @override
  void initState() {
    super.initState();
  }

  void getUsageStats() async {
    try {
      DateTime endDate = new DateTime.now();
      DateTime startDate = endDate.subtract(Duration(hours: 24));
      List<AppUsageInfo> infoList =
          await AppUsage.getAppUsage(startDate, endDate);
      setState(() {
        _infos = infoList;
      });

      for (var info in infoList) {
        debugPrint(info.toString());
        print("dgjdjgn");
      }
    } on AppUsageException catch (exception) {
      debugPrint(exception.toString());
      print("fhgdjgnjn");
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Usage'),
          backgroundColor: Colors.red,
        ),
        body: ListView.builder(
            itemCount: _infos.length,
            itemBuilder: (context, index) {
              return ListTile(
                title: Text(_infos[index].appName),
                trailing: Text(_infos[index].usage.toString()),
              );
            }),
        floatingActionButton: FloatingActionButton(
            onPressed: getUsageStats, child: Icon(Icons.file_download)),
      ),
    );
  }
}
