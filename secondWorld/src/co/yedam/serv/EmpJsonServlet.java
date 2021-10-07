package co.yedam.serv;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.common.EmpDAO;
import co.yedam.common.Employee;

@WebServlet("/empJsonServlet.json")
public class EmpJsonServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public EmpJsonServlet() {
		super();

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// response.getWriter().append("Served at: ").append(request.getContextPath());
		PrintWriter out = response.getWriter();
		EmpDAO dao = new EmpDAO();
		List<Employee> list = dao.getEmpList();
		int cnt = 0, lastCnt = list.size();
		out.print("[");
		for (Employee emp : list) {
			out.print("{\"empId\":\"" + emp.getEmployeeId() + "\", \"lname\":\"" + emp.getLastName()
					+ "\", \"email\":\"" + emp.getEmail() + "\", \"hireDate\":\"" + emp.getHireDate() + "\", \"job\":\""
					+ emp.getJobId() + "\"}");
			// , 마지막 건수 (,)
			cnt++;
			if(cnt != lastCnt) {
				out.println(",");
			}
		}
		out.println("]");
		// {"name":"HongKildong", "age":"15", "score":80}
		// {"empId":"?", "lname":"?", "email":"?", "hireDate":"?", "job":"?"}
		// out.println("{\"name\":\"HongKildong\", \"age\":\"15\", \"score\":80}");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
