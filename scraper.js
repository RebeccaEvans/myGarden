const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const app = express()

const id = [1, 4, 10, 12, 15, 17, 18, 20, 22, 28, 29, 30, 33, 34, 35, 36, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 58, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 73, 75, 76, 79, 83, 84, 85, 86, 87, 88, 89, 92, 93, 94, 109, 110, 118, 121, 122, 126, 130, 137, 138, 139, 140, 141, 146, 151, 153, 155, 163, 164, 165, 166, 168, 169, 173, 175, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 194, 200, 204, 205, 206, 207, 208, 209, 212, 213, 214, 215, 216, 218, 220, 221, 222, 223, 227, 228, 230, 232, 233, 235, 237, 239, 240, 242, 243, 246, 250, 251, 252, 253, 255, 256, 257, 260, 261, 262, 263, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 277, 278, 280, 283, 285, 288, 291, 295, 296, 297, 298, 300, 301, 303, 305, 319, 323, 326, 327, 329, 330, 331, 339, 341, 342, 343, 344, 345, 346, 348, 349, 350, 351, 353, 354, 355, 360, 361, 362, 373, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 394, 395, 396, 397, 398, 401, 402, 406, 408, 409, 410, 411, 413, 414, 415, 416, 419, 421, 423, 425, 426, 435, 436, 437, 438, 439, 441, 443, 444, 445, 446, 447, 448, 449, 450, 451, 454, 463, 464, 465, 466, 469, 470, 472, 477, 478, 480, 481, 482, 483, 484, 485, 487, 491, 494, 495, 496, 497, 499, 500, 501, 502, 514, 515, 516, 517, 518, 519, 520, 522, 523, 528, 531, 532, 533, 534, 535, 536, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 552, 556, 557, 558, 561, 562, 563, 565, 566, 567, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 589, 590, 591, 592, 593, 603, 604, 608, 612, 613, 614, 615, 618, 629, 630, 632, 633, 635, 636, 637, 640, 642, 643, 644, 648, 651, 652, 656, 665, 670, 671, 672, 683, 684, 685, 686, 687, 688, 691, 692, 693, 694, 695, 698, 699, 701, 702, 703, 705, 707, 709, 713, 714, 715, 716, 720, 722, 723, 726, 727, 728, 729, 734, 740, 741, 742, 743, 745, 746, 747, 748, 750, 751, 752, 754, 755, 757, 760, 761, 762, 779, 783, 784, 787, 788, 789, 790, 791, 793, 795, 796, 797, 798, 801, 804, 805, 806, 807, 808, 809, 810, 811, 814, 816, 817, 818, 819, 821, 822, 828, 829, 833, 836, 837, 838, 840, 841, 853, 857, 858, 865, 871, 872, 873, 875, 877, 882, 888, 889, 892, 894, 895, 896, 900, 901, 906, 909, 911, 915, 916, 917, 922, 928, 933, 945, 947, 950, 952, 953, 956, 957, 962, 965, 966, 968, 969, 970, 972, 976, 977, 979, 980, 981, 983, 984, 985, 987, 989, 993, 995, 996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1009, 1011, 1016, 1020, 1021, 1022, 1023, 1027, 1028, 1029, 1031, 1032, 1033, 1034, 1039, 1042, 1044, 1045, 1050, 1054, 1058, 1060, 1062, 1063, 1064, 1067, 1068, 1069, 1071, 1072, 1077, 1083, 1084, 1086, 1089, 1090, 1091, 1092, 1093, 1099, 1100, 1114, 1115, 1116, 1117, 1119, 1121, 1126, 1131, 1138, 1143, 1151, 1152, 1153, 1157, 1158, 1159, 1160, 1168, 1169, 1170, 1171, 1173, 1174, 1184, 1187, 1188, 1191, 1197, 1209, 1211, 1213, 1214, 1219, 1221, 1222, 1223, 1224, 1225, 1226, 1227, 1229, 1230, 1232, 1233, 1234, 1235, 1239, 1240, 1241, 1244, 1245, 1247, 1249, 1253, 1254, 1260, 1262, 1265, 1267, 1268, 1270, 1273, 1274, 1275, 1280, 1288, 1290, 1291, 1292, 1293, 1294, 1295, 1296, 1297, 1298, 1299, 1300, 1301, 1302, 1303, 1304, 1305, 1306, 1307, 1308, 1309, 1310, 1311, 1312, 1313, 1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321, 1322, 1323, 1325, 1326, 1327, 1328, 1329, 1330, 1331, 1332, 1333, 1334, 1340, 1341, 1342, 1343, 1344, 1345, 1346, 1347, 1348, 1349, 1351, 1353, 1354, 1355, 1359, 1360, 1362, 1363, 1364, 1365, 1366, 1367, 1368, 1370, 1371, 1372, 1374, 1376, 1379, 1380, 1381, 1382, 1385, 1388, 1389, 1390, 1396, 1397, 1398, 1399, 1401, 1404, 1410, 1411, 1412, 1414, 1417, 1421, 1423, 1425, 1426, 1427, 1429, 1431, 1432, 1433, 1434, 1435, 1439, 1440, 1449, 1450, 1451, 1452, 1453, 1454, 1455, 1457, 1458, 1459, 1460, 1461, 1466, 1472, 1473, 1474, 1476, 1477, 1481, 1482, 1484, 1488, 1489, 1495, 1496, 1497, 1499, 1500, 1511, 1512, 1513, 1514, 1521, 1530, 1538, 1540, 1541, 1542, 1545, 1547, 1551, 1552, 1555, 1556, 1562, 1565, 1566, 1567, 1568, 1569, 1572, 1573, 1574, 1575, 1576, 1577, 1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1594, 1597, 1598, 1599, 1600, 1601, 1605, 1609, 1611, 1614, 1615, 1620, 1625, 1626, 1627, 1629, 1634, 1635, 1638, 1639, 1641, 1643, 1647, 1648, 1649, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1664, 1665, 1666, 1667, 1685, 1686, 1687, 1688, 1689, 1690, 1691, 1692, 1693, 1694, 1695, 1696, 1698, 1699, 1700, 1701, 1714, 1717, 1719, 1721, 1728, 1730, 1731, 1733, 1734, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744, 1745, 1746, 1749, 1750, 1751, 1752, 1753, 1754, 1755, 1756, 1757, 1758, 1759, 1760, 1762, 1763, 1764, 1766, 1767, 1778, 1783, 1784, 1785, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1794, 1795, 1801, 1802, 1803, 1804, 1811, 1815, 1817, 1823, 1824, 1825, 1827, 1828, 1829, 1830, 1831, 1832, 1833, 1834, 1835, 1837, 1838, 1839, 1840, 1841, 1842, 1843, 1847, 1848, 1851, 1852, 1853, 1855, 1857, 1858, 1859, 1860, 1861, 1862, 1863, 1864, 1865, 1870, 1879, 1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1892, 1893, 1896, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1911, 1913, 1914, 1915, 1916, 1917, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1947, 1948, 1949, 1955, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1983, 1984, 1985]


// axios.get(`https://www.greatplantpicks.org/plantlists/view/1`)
// 		.then(function(response) {
// 			//const data = cheerio.load(response.data)
// 			console.log(response.config.url)
// 		})
	
// 		.catch(function (error) {
// 			// handle error
// 		console.log(error);
// 		})

function scrapeGPP(arr) {
	for(var k = 0; k<arr.length; k++) {
		axios.get(`https://www.greatplantpicks.org/plantlists/view/${arr[k]}`)
		.then(function(response) {
			const $ = cheerio.load(response.data)
			// Create plant object and populate with initial data
			const plant = {
				'plantUrl': response.config.url,
				'latinName': $('.crossgenus').text() + $('.genus').text() + $('.species').text() + $('.cultivar').text(),
				'common_name': $('.common-name').text(),
				'imgUrl': $('.show').attr('src'),
				}
			//console.log(plant)
	
			const facts = []
			$('p', '.quickfacts').each(function() {
				facts.push($(this).text())
			})
			//console.log(facts)
			//Create an object with the data from the facts array, which is the text from each paragraph in the quickfacts class

			const factsObj = {}
	
			for(var i=0; i<facts.length; i++) {
				var str = facts[i].toLowerCase().replace('/',' ').replace('-', ' ')
				var split = str.split(':')
				var keyStr = split[0].trim().replace(' ', '_')
				var key = keyStr.replace(' ', '_')
				factsObj[key] = split[1].trim()	
			}
	
			// Define additional key/value pairs for plant object
	
			plant.type = factsObj.plant_type
			plant.foliage = factsObj.foliage_type
			plant.hardiness = factsObj.hardiness
			plant.exposure = factsObj.sun_light_exposure
			plant.waterReq = factsObj.water_requirements
			plant.seasonalInt = factsObj.seasonal_interest
	
			//console.log(plant)
			const plantObj = JSON.stringify(plant)
			fs.appendFile('plants.json', `${plantObj}` + ',', (err) => {
				if (err) throw err
				console.log('plant file updated')
			})
			
		})
	
		.catch(function (error) {
			// handle error
		console.log(error);
		})
	}
}

scrapeGPP(id)

// // scrape data from great plant picks
// axios.get('https://www.greatplantpicks.org/plantlists/view/1')
// 	.then(function(response) {
// 		const $ = cheerio.load(response.data)
// 		const plant = {
// 			'latinName': $('.crossgenus').text() + $('.genus').text() + $('.species').text() + $('.cultivar').text(),
// 			'common_name': $('.common-name').text(),
// 			'imgUrl': $('.show').attr('src'),
// 			}
// 		//console.log(plant)

// 		const facts = []
// 		$('p', '.quickfacts').each(function() {
// 			facts.push($(this).text())
// 		})
// 		//console.log(facts)

// 		const factsObj = {}

// 		for(var i=0; i<facts.length; i++) {
// 			var str = facts[i].toLowerCase().replace('/',' ').replace('-', ' ')
// 			var split = str.split(':')
// 			var keyStr = split[0].trim().replace(' ', '_')
// 			var key = keyStr.replace(' ', '_')
// 			factsObj[key] = split[1].trim()	
// 		}

// 		//console.log(factsObj)

// 		plant.type = factsObj.plant_type
// 		plant.foliage = factsObj.foliage_type
// 		plant.hardiness = factsObj.hardiness
// 		plant.exposure = factsObj.sun_light_exposure
// 		plant.waterReq = factsObj.water_requirements
// 		plant.seasonalInt = factsObj.seasonal_interest

// 		console.log(plant)
// 	})

// 	.catch(function (error) {
// 		// handle error
// 	console.log(error);
// 	})

// // Extracts list of urls for each plant in Great Plant Picks list of all plants

// axios.get('https://www.greatplantpicks.org/plantlists/by_publish/yes')

// 	.then(function(response) {
// 		const $ = cheerio.load(response.data)
// 		const plantUrls = []
		
// 		$('a', '.plantname').each(function () {
// 			plantUrls.push($(this).attr('href'))
// 		})

// 		//console.log(plantUrls)

// 		const prlantUrlStr = plantUrls.toString()

// 		let writeStream = fs.createWriteStream('planturls.txt');

// 		writeStream.write(prlantUrlStr);

// 		writeStream.on('finish', () => {	
// 			console.log('wrote all data to file');
// 		});

// 		// close the stream
// 		writeStream.end();

// 	})

// 	.catch(function (error) {
// 	// handle error

// 	console.log(error);
// 	})