
import { initTable } from "./components/table.js";

const SMALL_DATA_URL = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}';
const BIG_DATA_URL = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32};'

const imputBar = document.querySelector('#inputBar');
imputBar.classList.add('visually-hidden');

const start = async (url) => {

    const loader = document.querySelector('#loader');
    loader.classList.remove('visually-hidden');

    const response = await fetch(url);
    const tableData = await response.json();
    loader.classList.add('visually-hidden');
    imputBar.classList.remove('visually-hidden');
    const { fillTable } = initTable(tableData);

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
                '<option value="-1">Все</option>' +
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
            infoPostFix: "",
            zeroRecords: "Записи отсутствуют.",
            emptyTable: "В таблице отсутствуют данные",
        },

        "rowCallback": function (row) {
            row.addEventListener('mouseenter', () => {
                row.classList.add('tr-hover');
            });
            row.addEventListener('mouseleave', () => {
                row.classList.remove('tr-hover');
            });
        }
    });

    const myInput = document.querySelector('#input');
    const findBtn = document.querySelector('#find');

    const search = () => {
        table.search(myInput.value).draw();
    };

    myInput.addEventListener('input', (e) => {
        if (!myInput.value) {
            table.search('').draw();
        }
    });

    myInput.addEventListener('keydown', (e) => {
        if (e.keyCode == 13 || e.keyCode === 'Enter') {
            e.preventDefault();
            search();
        }
    });

    findBtn.addEventListener('click', search);
}

document.addEventListener('DOMContentLoaded', async () => {
    const smallDataBtn = document.querySelector("#small-data");
    const bigDataBtn = document.querySelector("#big-data");
    loader.classList.add('visually-hidden');

    smallDataBtn.addEventListener('click', () => {
        start(SMALL_DATA_URL);
    });

    bigDataBtn.addEventListener('click', () => {
        start(BIG_DATA_URL);
    });
});
