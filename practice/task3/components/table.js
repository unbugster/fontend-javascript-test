
const insertDisplayedData = (id, data, el) => {

    const clickedElementData = data.find(item => item.id == Number(id));
    const { firstName, lastName, adress } = clickedElementData;
    let { description } = clickedElementData;
    const { streetAddress, city, state, zip } = adress;

    if (!description) {
        description = '<b>Нет информации</b>'
    }

    el.innerHTML = `
        <div class="card-body" id="card">
            <h5 class="card-title">Карточка пользователя:</h5>
            <ul class="list-group">
                <li class="list-group-item list-group-item-secondary">Выбран пользователь: <b>${firstName + ' ' + lastName}</b></li>
                <li class="list-group-item list-group-item-secondary">Описание: ${description} </li>
                <li class="list-group-item list-group-item-secondary">Адрес проживания: <b>${streetAddress}</b></li>
                <li class="list-group-item list-group-item-secondary">Город: <b>${city}</b></li>
                <li class="list-group-item list-group-item-secondary">Провинция/штат: <b>${state}</b></li>
                <li class="list-group-item list-group-item-secondary">Индекс: <b>${zip}</b></li>
            </ul>
        </div>
`
};

const initTable = (data) => {

    const root = document.querySelector('#root');
    const table = document.createElement('table');
    table.classList.add('table', 'compact', 'hover');
    table.id = "table";

    const detailedInfo = document.createElement('div');
    detailedInfo.id = "detailedInfo";
    detailedInfo.hidden = true;

    root.innerHTML = '';
    root.append(table);
    root.append(detailedInfo);

    const state = {
        displayed: null,
    };

    const fillTable = () => {

        table.innerHTML = `
        <thead>
            <tr class="table__header">
                <th data-name="id">id</th>
                <th data-name="firstName">firstName</th>
                <th data-name="lastName">lastName</th>
                <th data-name="email">email</th>
                <th data-name="phone">phone</th>
            </tr>
        </thead>
        <tbody>
        ${data.map((item) => {
            const { id, firstName, lastName, email, phone } = item;

            return `
            <tr class="tr" data-id="${id}" >
                <td>${id}</td>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${email}</td>
                <td>${phone}</td>
            </tr>
        `}).join('')}
        </tbody>
        `;

        const scrollToDetailedInfo = () => {
            const info = document.querySelector('#info');
            if (info) {

                info.scrollIntoView(false);
            }
        }

        table.addEventListener('click', (evt) => {
            const tr = evt.target.closest('tbody tr');

            if (!tr) {
                return;
            }

            const { id } = tr.dataset;
            if (!id) {
                return
            }

            const isTheSameRowClicked = !detailedInfo.hidden && state.displayed === id;

            if (isTheSameRowClicked) {
                detailedInfo.hidden = true;
                state.displayed = null;
            } else {
                insertDisplayedData(id, data, detailedInfo);

                detailedInfo.hidden = false;
                state.displayed = id;
                scrollToDetailedInfo();
            }
        });

    };

    return {
        fillTable,
    };
}

export { initTable };
