const spendingChart = document.getElementById('spendingChart');

const hoverBar = function (e, amount) {
    const bar = e.target;
    
    const barAmount = document.createElement('div');
    barAmount.classList.add('bar-amount');
    barAmount.innerText = `$${amount}`;

    bar.insertAdjacentHTML('beforebegin', barAmount.outerHTML);
    bar.style.opacity = 0.5;
};

const mouseoutBar = function (e) {
    const bar = e.target;
    const barParent = e.target.parentElement;
    barParent.removeChild(barParent.firstChild);
    bar.style.opacity = 1;
};

const renderChart = function () {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const dayGroup = document.createElement('div');
                dayGroup.classList.add('day-group');

                const bar = document.createElement('div');
                bar.classList.add('bar', `bar-${item.day}`);
                bar.style.height = `${item.amount}%`;

                bar.addEventListener('mouseover', (e) => hoverBar(e, item.amount));
                bar.addEventListener('mouseout', (e) => mouseoutBar(e));

                const day = document.createElement('div');
                day.classList.add('day');
                day.innerText = item.day;

                dayGroup.appendChild(bar);
                dayGroup.appendChild(day);
                spendingChart.appendChild(dayGroup);
                
            })
        })
}

renderChart();

