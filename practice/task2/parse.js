const HTMLParser = require('node-html-parser');
const fs = require('fs');

const parseData = () => {
    const rawdata = fs.readFileSync('./data.json');
    const data = JSON.parse(rawdata);

    const features = data.userMap.features.map((item) => {
        const { title, coordinates, ...rest } = item;
        const [lat, lng] = coordinates;

        const parsedTitle = HTMLParser.parse(title);
        const [firstElement, ...restElements] = parsedTitle.querySelectorAll('p');
        const titleText = firstElement.querySelector('b').textContent.trim();

        const properties = {
            title: titleText,
        };

        restElements.forEach((el) => {
            const key = el.firstChild.textContent.split(':')[0].trim();
            const value = el.querySelector('span u').textContent.trim();

            return properties[key] = value;
        });

        return {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [lng, lat]
            },
            "properties": { ...properties, ...rest }
        }
    });

    return {
        "type": "FeatureCollection",
        features,
    }
};

console.log(JSON.stringify(parseData(), null, 2))
