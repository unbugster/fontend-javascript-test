const SMALL_DATA_URL = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&' +
    'lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}';
const BIG_DATA_URL = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&' +
    'delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32};';

const getData = async (dataSize) => {
    let url = SMALL_DATA_URL;

    if (dataSize === 'BIG_DATA_URL') {
        url = BIG_DATA_URL;
    }

    const response = await fetch(url);
    const tableData = await response.json();

    return tableData;
}

export { getData };
