#include <QCoreApplication>
#include <QString>
#include <QVector>
#include <QFile>
#include <QDebug>
#include <QPolygonF>
#include <QMap>
#include <iterator>

#include "../../Util/UsefulFuncs.hpp"

#define POLYGON 0
#define BLOCK 3
#define LOT 4

#define EPSILON 10e-5

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);


    QVector<QString> filenames =
    {
        "../../../data/pluto/mn_02-B_table.csv",
        "../../../data/pluto/mn_04-C_table.csv",
        "../../../data/pluto/mn_06-C_table.csv",
        "../../../data/pluto/mn_09-v1_table.csv",
        "../../../data/pluto/mn_11-v1_table.csv",
        "../../../data/pluto/mn_13-v1_table.csv",
        "../../../data/pluto/mn_15-v1_table.csv",
        "../../../data/pluto/mn_03-C_table.csv",
        "../../../data/pluto/mn_05-D_table.csv",
        "../../../data/pluto/mn_07-C_table.csv",
        "../../../data/pluto/mn_10-v1_table.csv",
        "../../../data/pluto/mn_12-v1_table.csv",
        "../../../data/pluto/mn_14-v1_table.csv"
    };

    // Load csv files
    QMap<QString, QVector<QPolygonF>> map; //map[block]
    for(int i=0; i<filenames.size(); i++)
    {
        QFile file(filenames[i]);
        if(!file.open(QIODevice::ReadOnly)) {
            qDebug() << file.errorString();
            return 1;
        }

        qDebug() << "Loading file" << filenames[i] << i << " of " << filenames.size();

        file.readLine(); // skip first two lines
        file.readLine();
        while(!file.atEnd()) {
            QList<QByteArray> tokens = file.readLine().split(',');

            // need to remove 10e+5 from some blocks/lots
            QString block = QString::number(tokens[BLOCK].toDouble()).leftJustified(5,'0');
            QString lot = QString::number(tokens[LOT].toDouble()).leftJustified(4,'0');
            QString bbl = "1" + block + lot;


            if(!map.contains(bbl)) {
                map[bbl] = QVector<QPolygonF>();
            }

            QVector<QPointF> points;
            QList<QByteArray> strpoints = tokens[POLYGON].split(';');
            for(int j=0; j<strpoints.size(); j++) {
                QList<QByteArray> strpoint = strpoints[j].split(' ');
                if(strpoint.length() == 2)
                    points.append(QPointF(strpoint[0].toDouble(), strpoint[1].toDouble()));
            }
            QPolygonF poly(points);
            map[bbl].append(poly);


        }
    }


    int differents = 0;
    int equals = 0;
    QMap<QString,QVector<QPolygonF>>::iterator iter1;
    for(iter1 = map.begin(); iter1 != map.end(); iter1++) {

        double area1 = computeArea(iter1.value()[0]);
//        qDebug() << iter1.value().length();
        for(int i=1; i<iter1.value().length(); i++) {
            double area2 = computeArea(iter1.value()[i]);
            if(fabs(area1 - area2) > EPSILON) {
                qDebug() << iter1.key() << area1 << area2;
                differents++;
            }
            else {
                equals++;
            }
        }
    }
    qDebug() << "equal: " << equals << ", different:" << differents;

}


