import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:sk_app/api/send_usage.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sk_app/models/SendUsage.dart';

import '../ProgressHUD.dart';

class SendUsagePage extends StatefulWidget {
  @override
  _SendUsagePageState createState() => _SendUsagePageState();
}

class _SendUsagePageState extends State<SendUsagePage> {
  bool isApiCallProcess = false;
  bool initialized = false;
  SendUsageRequestModel registerRequestModel;
  final scaffoldKey = GlobalKey<ScaffoldState>();
  @override
  void initState() {
    super.initState();
    registerRequestModel = new SendUsageRequestModel();
  }

  @override
  Widget build(BuildContext context) {
    return ProgressHUD(
      child: _uiSetup(context),
      inAsyncCall: isApiCallProcess,
      opacity: 0.3,
    );
  }

  Widget _uiSetup(BuildContext context) {
    return Scaffold(
      key: scaffoldKey,
      backgroundColor: Theme.of(context).accentColor,
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            TextButton(
                style: ButtonStyle(
                  foregroundColor:
                      MaterialStateProperty.all<Color>(Colors.blue),
                  overlayColor: MaterialStateProperty.resolveWith<Color>(
                    (Set<MaterialState> states) {
                      if (states.contains(MaterialState.hovered))
                        return Colors.blue.withOpacity(0.04);
                      if (states.contains(MaterialState.focused) ||
                          states.contains(MaterialState.pressed))
                        return Colors.blue.withOpacity(0.12);
                      return null; // Defer to the widget's default.
                    },
                  ),
                ),
                onPressed: () async {
                  final prefs = await SharedPreferences.getInstance();
                  var email = prefs.getString('email') ?? "";

                  // here get usage stats
                  // send to "initial report"
                  // then set up background fetch to periodically send to /report

                  if (initialized == false) {
                    initialized = true;
                  }
                },
                child: Text('TextButton'))
          ],
        ),
      ),
    );
  }
}
