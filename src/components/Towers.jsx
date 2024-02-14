'use client';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Towers = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://атлантис.рф/api/architecture',
    fetcher
  );

  //scroll base point into view on mobile
  useEffect(() => {
    document.getElementById('tower-2').scrollIntoView();
  }, []);

  //towers control
  const [activeTower, setActiveTower] = useState('');

  return (
    <section className='page towers'>
      <div className='towers__background'>
        <svg
          className='towers__svg'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1920 1080'
          preserveAspectRatio='xMinYMin slice'
        >
          <path
            onClick={() => {
              setActiveTower(86);
            }}
            className={activeTower == 86 ? 'active' : ''}
            d='M959.5 572.5V561.5H954.5V327.5H949V323.5H941V319H929.5V314.5H902V311H828.5V314.5H812V323.5H790.5V327.5H783V648.5H770.5V654H766.5V681H758V685H761V690.5L766.5 693V722L769.5 723.5V728H774.5V759H780.5V762H787.5V784.5H800V789.5H813.5V821.5H823.5V789.5H835.5V763.5H847.5V589.5H876.5V574.5L959.5 572.5Z'
          />
          <path
            onClick={() => {
              setActiveTower(88);
            }}
            className={activeTower == 88 ? 'active' : ''}
            d='M613 388.5V396.5H600V400.5H596V406.5H592L591 662.5H585H583V677.5H578.5V683V683.5V693.5V728.5L543 721V858L568 869.5H577.5L585.5 875L646.5 897.5L727.5 925L750 923L757 928L780.5 926.5L785 929.5L802 928V841.5H808V835H822.5V825.5L814 821V790.5L807 789.5V783.5L793 780.5V767H788.5V760L775 759V729H769V722.5L765.5 721.5V693L761 692V686L756.5 685V603L752 602.5V400.5H746V395.5H742V392H734.5V383.5H718V380H641.5V383.5H617V388.5H613Z'
          />
          <path
            id='tower-2'
            onClick={() => {
              setActiveTower(87);
            }}
            className={activeTower == 87 ? 'active' : ''}
            d='M1123.5 591L1081.5 587H1075.5V574H1052.5V572H875V587L847 588.5V761.5H833.5V789.5H822V837L800.5 839.5V928L802.5 929L796 935.5L799.5 937.5V945.5L807.5 951.5L812 949H821V952.5L825.5 953.5L835 960.5H844L875 996.5L887 995.5L898.5 984.5L901 980L889 969H897L901 959L907.5 967.5H916.5H928.5L924 959L931 961.5L935.5 953.5L942 964L945 977.5L950.5 980L953 987L950.5 996.5L945 1000.5L988 999L986.5 985.5L992.5 980L991.5 972L1001.5 959L1010 969L1014 983L1017.5 988.5L1019.5 985.5L1029 991V999H1035L1039.5 988.5L1051.5 977.5L1066 980L1073.5 984.5L1068.5 969L1073.5 953.5L1082 944L1093 957L1098.5 972L1089 987V991H1102.5L1109 984.5L1120 987H1145L1149.5 974.5L1157.5 959L1173 947L1180.5 940L1188.5 944L1191.5 951.5H1196.5L1203 934H1217.5L1224 937L1227 931.5H1237.5L1244 940L1249.5 931.5L1259.5 944L1264 957L1261.5 972H1277.5H1287.5L1291.5 963.5L1287.5 951.5L1293 942.5L1302.5 949L1311.5 951.5L1315 942.5L1329.5 929V903H1315V879.5L1299 870L1297 863L1274.5 849V842L1227 827V821L1203 809.5H1176V777H1169.5V767H1153V759H1134.5V755.5H1123.5V591Z'
          />
          <path
            onClick={() => {
              setActiveTower(91);
            }}
            className={activeTower == 91 ? 'active' : ''}
            d='M1634 243H1725.5V247H1730.5V255H1764H1767V817L1771 818.5V922L1753 924L1750.5 915L1740.5 903L1730 911.5L1723 927L1676 930L1671.5 919.5L1662 909L1652.5 915L1647.5 927V932.5H1639L1606.5 934.5L1601 935.5H1578L1579 927L1578 914L1571.5 901.5L1566 898L1559.5 903.5L1556 909V919.5L1548 920.5L1534.5 927L1527.5 939.5L1488 944L1492 932.5L1488 920.5L1484.5 905L1480.5 901.5L1470 911.5L1465.5 923.5L1462.5 932.5L1451.5 923.5H1442.5L1436 919.5L1428.5 911.5L1420 919.5L1414 927L1415 938L1417.5 946.5L1406 943L1395 944L1361.5 930L1330 916.5V905L1323.5 903.5H1315V881H1309.5H1299V866L1304 865.5V864H1310.5L1313.5 858H1321.5H1338V841.5H1368.5L1385.5 845.5V848H1423H1463V838.5H1478L1485.5 841.5V848H1513.5V810H1541.5L1545.5 628H1551.5V621H1554.5L1557 276.5H1560.5V271.5H1569V268H1581.5V255.5H1598.5V251H1616.5V247H1634V243Z'
          />
          <path
            onClick={() => {
              setActiveTower(90);
            }}
            className={activeTower == 90 ? 'active' : ''}
            d='M1324 810V762H1335V698H1347V549.5H1355.5V352.5H1379.5V350H1382V348H1383.5V344.5V340.5H1408V336H1497V340.5H1501.5V344.5H1505.5V348H1522.5V554H1525V621L1538 622V667.5H1544.5V702V808.5L1514.5 811V844L1486.5 841L1485.5 843L1438 836.5L1422.5 835V833L1387.5 826.5L1330.5 817L1324 815V810Z'
          />
          <path
            onClick={() => {
              setActiveTower(89);
            }}
            className={activeTower == 89 ? 'active' : ''}
            d='M1324.5 807.5V727.5H1314V650H1309V644H1306V553H1152.5V560.5H1142V644H1125V756H1134V759H1152.5V766H1166L1170.5 767.5V775.5H1176V784V800H1195L1202 803.5L1204 809H1211L1220.5 814H1237.5L1249.5 815.5L1259.5 817.5H1272H1278L1282 821H1289L1293 815.5H1298.5V809L1324.5 807.5Z'
          />
          <path
            onClick={() => {
              setActiveTower(90);
            }}
            className={activeTower == 90 ? 'point active' : 'point'}
            d='M1413 251L1477 251L1445.02 319L1413 251ZM1453.75 264.169L1435.5 264.169L1444.98 282.724L1453.75 264.169Z'
            fill='#273C55'
          />
          <path
            onClick={() => {
              setActiveTower(91);
            }}
            className={activeTower == 91 ? 'point active' : 'point'}
            d='M1629 158L1693 158L1661.02 226L1629 158ZM1669.75 171.169L1651.5 171.169L1660.98 189.724L1669.75 171.169Z'
            fill='#273C55'
          />
          <path
            onClick={() => {
              setActiveTower(89);
            }}
            className={activeTower == 89 ? 'point active' : 'point'}
            d='M1193 468L1257 468L1225.02 536L1193 468ZM1233.75 481.169L1215.5 481.169L1224.98 499.724L1233.75 481.169Z'
            fill='#273C55'
          />
          <path
            onClick={() => {
              setActiveTower(87);
            }}
            className={activeTower == 87 ? 'point active' : 'point'}
            d='M975 487L1039 487L1007.02 555L975 487ZM1015.75 500.169L997.5 500.169L1006.98 518.724L1015.75 500.169Z'
            fill='#273C55'
          />
          <path
            onClick={() => {
              setActiveTower(86);
            }}
            className={activeTower == 86 ? 'point active' : 'point'}
            d='M833 226L897 226L865.025 294L833 226ZM873.745 239.169L855.5 239.169L864.975 257.724L873.745 239.169Z'
            fill='#273C55'
          />
          <path
            onClick={() => {
              setActiveTower(88);
            }}
            className={activeTower == 88 ? 'point active' : 'point'}
            d='M641 295L705 295L673.025 363L641 295ZM681.745 308.169L663.5 308.169L672.975 326.724L681.745 308.169Z'
            fill='#273C55'
          />
        </svg>
      </div>

      {data &&
        !isLoading &&
        data.data.towers.map((tower) => (
          <div
            key={tower.id}
            className={
              activeTower == tower.id ? 'towers__item active' : 'towers__item'
            }
          >
            <h3>{tower.title}</h3>
            <div className='towers__info'>
              <div className='towers__info-item'>
                <span>Срок сдачи:</span>
                <span>{tower.term}</span>
              </div>
              <div className='towers__info-item'>
                <span>Площадь:</span>
                <span>{tower.square}</span>
              </div>
              <div className='towers__info-item'>
                <span>Квартир:</span>
                <span>{tower.flatsCount}</span>
              </div>
              <div className='towers__info-item'>
                <span>Этажей:</span>
                <span>{tower.floorsCount}</span>
              </div>
            </div>
            <p>{tower.description}</p>
          </div>
        ))}
      <div className='container'>
        <div className={activeTower ? 'towers__title' : 'towers__title active'}>
          <h1>{data && !isLoading && data.data.title}</h1>
          <p>{data && !isLoading && data.data.additionalText}</p>
        </div>
      </div>
    </section>
  );
};

export default Towers;
