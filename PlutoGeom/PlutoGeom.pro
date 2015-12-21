QT += core gui

TARGET = PlutoGeom
CONFIG += console
CONFIG -= app_bundle

CONFIG += c++11

TEMPLATE = app

SOURCES += main.cpp \
    ../../Util/UsefulFuncs.cpp \
    ../../MapView/QVector3DD.cpp

HEADERS += \
    ../../Util/UsefulFuncs.hpp \
    ../../MapView/QVector3DD.hpp


