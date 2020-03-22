// function convert(digit, base) {
//     function process(i, str) {
//         if (i === 1) return str + 1;
//         else if (i === 0) return str;
//         var r = i % base
//         return process(parseInt(i / base), str + r)
//     }
//     return process(digit, '').split('').reverse().join('');
// }

// function padWithZeroes(str, totalLength) {
//     var out = ''
//     for (var i = 0; i < totalLength - str.length; i++) {
//         out += '0'
//     }
//     for (var i = 0; i < str.length; i++) {
//         out += str[i]
//     }
//     return out;
// }

// function createTicket(digit) {
//     var str = padWithZeroes(convert(digit, 3), 12)
//     var ticket = [];
//     for (var i = 0; i < 12; i++) {
//         ticket.push(parseInt(str[i]))
//     }
//     return ticket;
// }

// function prob(matches, ticket) {
//     var p = 1.0;
//     for (i = 0; i < matches.length; i++) {
//         p *= matches[i][ticket.marks[i]] / 100.0
//     }
//     return p;
// }

// function createTickets() {
//     var out = [];
//     for (var i = 0; i < 3 ** 12; i++) {
//         out.push({ marks: createTicket(i) })
//     }
//     return out;
// }

// function withProbabilities(tickets, matches) {
//     var out = [];
//     for (var ticket of tickets) {
//         out.push({ probabilitiy: prob(matches, ticket), ...ticket })
//     }
//     out.sort((a, b) => b.probabilitiy - a.probabilitiy);
//     return out;
// }


// function toMatrix(tickets, pow) {
//     var out = [];
//     var n = 3 ** (4 + pow);
//     var cellSize = 3 ** pow;
//     for (i = 0; i < n; i += cellSize) {
//         var total = { count: cellSize, p: 0 };
//         var selected = { count: 0, p: 0 };
//         for (var j = 0; j < cellSize; j++) {
//             const p = tickets[i + j].probabilitiy;
//             total.p += p
//             if (tickets[i + j].selected) {
//                 selected.p += p
//                 selected.count++;
//             }
//         }
//         out.push({ total, selected });
//     }
//     return out;
// }

// function byMark(mark, min, max) {
//     return ticket => {
//         var m = mark.toUpperCase() === 'U' ? 1 : mark.toUpperCase() === 'B' ? 2 : 0;
//         var count = 0;
//         for (var i = 0; i < ticket.marks.length; i++) {
//             if (ticket.marks[i] === m) {
//                 count++;
//             }
//         }
//         return {
//             ...ticket,
//             selected: ticket.selected && count >= min && count <= max
//         }
//     }
// }

// function bySelection(selection, min, max) {
//     return ticket => {
//         var count = 0;
//         for (var i = 0; i < ticket.marks.length; i++) {
//             if (selection[i].includes(ticket.marks[i])) {
//                 count++;
//             }
//         }
//         return {
//             ...ticket,
//             selected: ticket.selected && count >= min && count <= max
//         }
//     }
// }

// function byCount(n) {
//     var count = 0;
//     return ticket => {
//         if (ticket.selected) {
//             count++;
//         }
//         return {
//             ...ticket,
//             selected: ticket.selected && count <= n
//         }
//     }
// }

// function applyFilters(tickets, filters) {
//     var out = tickets.map(t => ({ ...t, selected: true }));
//     for (var f of filters) {
//         out = out.map(f)
//     }
//     return out;
// }

// // TEST

// // var matches = [
// //     [73, 14, 13],
// //     [49, 29, 22],
// //     [22, 19, 59],
// //     [38, 29, 33],
// //     [29, 26, 45],
// //     [54, 25, 21],
// //     [55, 23, 22],
// //     [29, 27, 44],
// //     [59, 22, 19],
// //     [72, 15, 13],
// //     [35, 31, 34],
// //     [42, 30, 28],
// // ];

// var matches = [
//     [75, 13, 12],
//     [48, 30, 22],
//     [20, 18, 62],
//     [36, 30, 34],
//     [27, 26, 47],
//     [55, 26, 19],
//     [54, 24, 22],
//     [29, 27, 44],
//     [59, 23, 18],
//     [76, 13, 11],
//     [35, 31, 34],
//     [41, 31, 28],
// ];


// // var level = parseInt(process.argv[2])
// var level = parseInt(4)
// var tickets = createTickets()
// var probabilities = withProbabilities(tickets, matches)


// var ticketsWithProbabilityFiltered = applyFilters(probabilities, [
//     // byMark('u', 1, 5),
//     // byMark('b', 2, 4),
//     // bySelection([
//     //     [0], // [73, 14, 13] Liverpool—Crystal PalaceTR
//     //     [], // [49, 29, 22] Burnley—WatfordTR
//     //     [], // [22, 19, 59] Newcastle United—Manchester CityTR
//     //     [], // [38, 29, 33] Hull City—MiddlesbroughTR
//     //     [], // [29, 26, 45] Sheffield Wednesday—West Bromwich AlbionTR
//     //     [], // [54, 25, 21] Millwall FC—Swansea CityTR
//     //     [], // [55, 23, 22] Preston North End—Derby CountyTR
//     //     [], // [29, 27, 44] Reading FC—BrentfordTR
//     //     [], // [59, 22, 19] Birmingham City—Huddersfield TownTR
//     //     [0], // [72, 15, 13] Leeds United—Luton TownTR
//     //     [], // [35, 31, 34] Barnsley—Blackburn RoversTR
//     //     [], // [42, 30, 28] Wigan Athletic—Stoke CityTR
//     // ], 1, 1),
//     bySelection([
//         [0], // [73, 14, 13] Liverpool—Crystal PalaceTR
//         [0], // [49, 29, 22] Burnley—WatfordTR
//         [2], // [22, 19, 59] Newcastle United—Manchester CityTR
//         [0, 1, 2], // [38, 29, 33] Hull City—MiddlesbroughTR
//         [2], // [29, 26, 45] Sheffield Wednesday—West Bromwich AlbionTR
//         [0], // [54, 25, 21] Millwall FC—Swansea CityTR
//         [0], // [55, 23, 22] Preston North End—Derby CountyTR
//         [2], // [29, 27, 44] Reading FC—BrentfordTR
//         [0], // [59, 22, 19] Birmingham City—Huddersfield TownTR
//         [0], // [72, 15, 13] Leeds United—Luton TownTR
//         [0, 1, 2], // [35, 31, 34] Barnsley—Blackburn RoversTR
//         [0], // [42, 30, 28] Wigan Athletic—Stoke CityTR
//     ], 8, 10),
//     byCount(2400),
// ]);

// console.log('NUMBER OF TICKETS FILTERED:', ticketsWithProbabilityFiltered.length, ticketsWithProbabilityFiltered.filter(t => t.selected).length);

// var m = toMatrix(ticketsWithProbabilityFiltered, level)

// // console.log(m.reduce((acc, x) => acc + x), 3 ** (level + 4), 3 ** (level + 4) / 3 ** 12)
// console.log(m);

// var p = ticketsWithProbabilityFiltered
//     .filter(t => t.selected)
//     .reduce((a, b) => a + b.probabilitiy, 0);

// console.log('SELECTION:', 3 ** (4 + level))
// console.log('PROBABILITY:', p)