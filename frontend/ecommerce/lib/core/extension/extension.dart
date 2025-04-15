import 'package:flutter/material.dart';

getSize(BuildContext context) {
  return MediaQuery.of(context).size;
}

extension GetSize on double {
  double h(BuildContext context) {
    return MediaQuery.of(context).size.height * this;
  }

  double w(BuildContext context) {
    return MediaQuery.of(context).size.width * this;
  }

  double toRes(BuildContext context) {
    return (getSize(context).height * this) + (getSize(context).width * this);
  }
}
