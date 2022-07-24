import { initTable } from "./components/table.js";
import { getData } from "./components/api.js";

const SMALL_DATA_BTN = document.querySelector("#small-data");
const BIG_DATA_BTN = document.querySelector("#big-data");
const FIND_BTN = document.querySelector('#find');
const SEARCH_INPUT = document.querySelector('#input');
const INPUT_BAR = document.querySelector('#inputBar');
const ROOT = document.querySelector('#root');
const PRELOADER = document.querySelector('.loader');

document.addEventListener('DOMContentLoaded', () => {

    const addTable = (data) => {

        PRELOADER.hidden = true;
        INPUT_BAR.hidden = false;
        INPUT_BAR.classList.remove('visually-hidden');

        const { fillTable } = initTable(data);
        fillTable();

        let table = new DataTable('#table', {
            dom: 'lrtip',
            language: {
                search: "Поиск:",
                info: "Выбрана страница _PAGE_ из _PAGES_",
                lengthMenu: 'Показать <select>' +
                    '<option value="10">10</option>' +
                    '<option value="20">20</option>' +
                    '<option value="50">50</option>' +
                    '</select>',
                paginate: {
                    "first": "Первая",
                    "last": "Последняя",
                    "next": "Следующая",
                    "previous": "Предыдущая",
                },
                infoEmpty: "Совпадения не найдены",
                infoFiltered: "(отфильтровано из _MAX_ записей)",
                loadingRecords: "Загрузка...",
                zeroRecords: "Записи отсутствуют.",
                emptyTable: "В таблице отсутствуют данные",
            },
        });

        const searchData = () => {
            table.search(SEARCH_INPUT.value).draw();
        };

        SEARCH_INPUT.addEventListener('input', () => {
            if (!SEARCH_INPUT.value) {
                table.search('').draw();
            }
        });

        SEARCH_INPUT.addEventListener('keydown', (evt) => {
            if (evt.keyCode == 13 || evt.keyCode === 'Enter') {
                evt.preventDefault();
                searchData();
            }
        });

        FIND_BTN.addEventListener('click', searchData);
    }

    const displayPreparation = () => {
        ROOT.innerHTML = '';
        INPUT_BAR.hidden = true;
        PRELOADER.classList.remove('visually-hidden');
        PRELOADER.hidden = false;
    }

    SMALL_DATA_BTN.addEventListener('click', async () => {
        BIG_DATA_BTN.disabled = true;
        displayPreparation();
        const tableData = await getData('SMALL_DATA_URL');
        BIG_DATA_BTN.disabled = false;
        addTable(tableData);
    });

    BIG_DATA_BTN.addEventListener('click', async () => {
        SMALL_DATA_BTN.disabled = true;
        displayPreparation();
        const tableData = await getData('BIG_DATA_URL');
        SMALL_DATA_BTN.disabled = false;
        addTable(tableData);
    });

});
