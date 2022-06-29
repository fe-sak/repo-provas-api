var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { database } from '../src/database.js';
function populateTerms() {
    return __awaiter(this, void 0, void 0, function () {
        var data, i, createMany;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Populating terms table...');
                    data = [];
                    for (i = 1; i < 10; i++) {
                        data.push({ number: i });
                    }
                    console.log({ data: data });
                    return [4 /*yield*/, database.term.createMany({
                            data: data
                        })];
                case 1:
                    createMany = _a.sent();
                    console.log(createMany);
                    return [2 /*return*/];
            }
        });
    });
}
function populateDisciplines() {
    return __awaiter(this, void 0, void 0, function () {
        var data, createMany;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Populating disciplines table...');
                    data = [
                        { name: 'HTML', termId: 1 },
                        {
                            name: 'Javascript',
                            termId: 1
                        },
                        { name: 'CSS', termId: 1 },
                        { name: 'Typescript', termId: 2 },
                        { name: 'Prisma', termId: 2 },
                    ];
                    console.log({ data: data });
                    return [4 /*yield*/, database.discipline.createMany({
                            data: data
                        })];
                case 1:
                    createMany = _a.sent();
                    console.log(createMany);
                    return [2 /*return*/];
            }
        });
    });
}
function populateTeachers() {
    return __awaiter(this, void 0, void 0, function () {
        var data, createMany;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Populating teachers table...');
                    data = [
                        { name: 'Dina' },
                        { name: 'Bruna' },
                        { name: 'Iagod' },
                        { name: 'Leo' },
                        { name: 'Thiago' },
                    ];
                    console.log({ data: data });
                    return [4 /*yield*/, database.teacher.createMany({
                            data: data
                        })];
                case 1:
                    createMany = _a.sent();
                    console.log(createMany);
                    return [2 /*return*/];
            }
        });
    });
}
function populateDisciplinesTeachers() {
    return __awaiter(this, void 0, void 0, function () {
        var data, createMany;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Populating disciplinesTeachers table...');
                    data = [
                        {
                            teacherId: 1,
                            disciplineId: 1
                        },
                        {
                            teacherId: 1,
                            disciplineId: 2
                        },
                        {
                            teacherId: 1,
                            disciplineId: 3
                        },
                        {
                            teacherId: 2,
                            disciplineId: 4
                        },
                        {
                            teacherId: 2,
                            disciplineId: 5
                        },
                        {
                            teacherId: 3,
                            disciplineId: 1
                        },
                        {
                            teacherId: 3,
                            disciplineId: 2
                        },
                        {
                            teacherId: 3,
                            disciplineId: 3
                        },
                    ];
                    console.log({ data: data });
                    return [4 /*yield*/, database.disciplineTeacher.createMany({
                            data: data
                        })];
                case 1:
                    createMany = _a.sent();
                    console.log(createMany);
                    return [2 /*return*/];
            }
        });
    });
}
function populateCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var data, createMany;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Populating categories table...');
                    data = [
                        { name: 'Ternários' },
                        { name: 'Tipos' },
                        { name: 'Lógica' },
                        { name: 'Estilos' },
                    ];
                    console.log({ data: data });
                    return [4 /*yield*/, database.category.createMany({
                            data: data
                        })];
                case 1:
                    createMany = _a.sent();
                    console.log(createMany);
                    return [2 /*return*/];
            }
        });
    });
}
function populateTests() {
    return __awaiter(this, void 0, void 0, function () {
        var data, createMany;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Populating tests table...');
                    data = [
                        {
                            name: 'Prova de Javascript',
                            pdfUrl: 'https://docente.ifrn.edu.br/brunogurgel/disciplinas/2013/desweb/exercicios/lista3-javascript.pdf',
                            categoryId: 3,
                            disciplineTeacherId: 1
                        },
                        {
                            name: 'Prova de Javascript',
                            pdfUrl: 'https://docente.ifrn.edu.br/brunogurgel/disciplinas/2013/desweb/exercicios/lista3-javascript.pdf',
                            categoryId: 1,
                            disciplineTeacherId: 2
                        },
                        {
                            name: 'Prova de Typescript',
                            pdfUrl: 'https://docente.ifrn.edu.br/brunogurgel/disciplinas/2013/desweb/exercicios/lista3-javascript.pdf',
                            categoryId: 2,
                            disciplineTeacherId: 3
                        },
                        {
                            name: 'Prova de Typescript',
                            pdfUrl: 'https://docente.ifrn.edu.br/brunogurgel/disciplinas/2013/desweb/exercicios/lista3-javascript.pdf',
                            categoryId: 4,
                            disciplineTeacherId: 4
                        },
                    ];
                    console.log({ data: data });
                    return [4 /*yield*/, database.test.createMany({
                            data: data
                        })];
                case 1:
                    createMany = _a.sent();
                    console.log(createMany);
                    return [2 /*return*/];
            }
        });
    });
}
function runAllFunctions() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
runAllFunctions();
