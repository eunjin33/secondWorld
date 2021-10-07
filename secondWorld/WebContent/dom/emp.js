let xhtp = new XMLHttpRequest();
xhtp.onload = function () {
    let data = JSON.parse(xhtp.responseText);
    showEmpList(data);
}

xhtp.open('get', '../empJsonServlet.json');
xhtp.send();


function showEmpList(data) {
    
    let table, tr, td, txt;
    table = document.createElement('table');
    table.setAttribute('border', '1');

    let titles = ['사원번호', '이름', '이메일', '입사일자', '직무', '기능'];
    tr = document.createElement('tr');

    for (let title of titles) {
        td = document.createElement('th');
        txt = document.createTextNode(title);
        td.appendChild(txt);
        tr.appendChild(td);
    }
    table.appendChild(tr);


    //데이터 한 건 처리
    function getRow(row) {
        let tr, td;
        tr = document.createElement('tr');
        tr.onclick = function (e) {
            console.log(this, e);
            document.getElementById('empId').value = this.childNodes[0].innerHTML; //id 값 
            document.getElementById('name').value = this.childNodes[1].innerHTML;
            document.getElementById('email').value = this.childNodes[2].innerHTML;
            document.getElementById('hire').value = this.childNodes[3].innerHTML;
            document.getElementById('job').value = this.childNodes[4].innerHTML;

        }
        for (let field in row) {
            td = document.createElement('td');
            td.appendChild(document.createTextNode(row[field]));
            tr.appendChild(td);
        }

        //삭제버튼 추가
        let btn = document.createElement('button');
        btn.onclick = function (e) {
            e.stopPropagation(); //button < td < tr < table < body
            let id = this.parentNodo.parentNodo.firstChild.innerHTML;
            let tr = this.parentNodo.parentNodo;
            //삭제 서블릿  call 아작스를 통해서 호출
            let xhtp = new XMLHttpRequest();
            xhtp.onload = function () {
                console.log(xhtp.responseText);
                let result = JSON.parse(xhtp.responseText); //JOON -> obj
                if (result.retCode == 'success') {
                    tr.remove();
                } else {
                    window.alert('처리중 에러발생');
                }
            }
            //../delEmpServlet= 서블릿의 
            xhtp.open('get', '../delEmpServlet?delId=' + id);
            xhtp.send();
        }

        bnt.innerHTML = '삭제';
        td = document.createElement('td');
        td.appendChild(btn);
        tr.appendChild(td);

        return tr;
    }
    table.appendChild(tr);

    //데이터
    for (let obj of data) {
        tr = document.createElement('tr');
        table.appendChild(tr);
        for (let field in data[0]) {
            td = document.createElement('td');
            txt = document.createTextNode(obj[field]);
            td.appendChild(txt);
            tr.appendChild(td);
        }

    }
    document.getElementById('show').appendChild(table);

}