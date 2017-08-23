using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity.Infrastructure;
using Newtonsoft.Json;
using System.Data.Entity;

namespace Smiley.Controllers
{
    public class HomeController : Controller
    {
        private ContosoUniversity89Entities db = new ContosoUniversity89Entities();
        public ActionResult Index()
        {
         
            return View();
        }
        public JsonResult List()
        {
            /*
             return this.Json(
                (from obj in db.Person  select new { ID = obj.ID, FirstName = obj.FirstName, LastName = obj.LastName, EnrollmentDate = obj.EnrollmentDate })
                , JsonRequestBehavior.AllowGet
                );
                */
            var query = from obj in db.Person select new { ID = obj.ID, FirstName = obj.FirstName, LastName = obj.LastName, EnrollmentDate = obj.EnrollmentDate };
            return new JsonResult() { Data = query, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult Add(Person person)
        {
            db.Person.Add(person);
            var query =  db.SaveChanges();
            var hasil = "";
            if(query == 1)
            {
                hasil = "benar";
            }
            else
            {
                hasil = "salah";
            }
            return Json(hasil, JsonRequestBehavior.AllowGet);
           
        }
        public JsonResult getbyID(int ID)
        {
           var query = from obj in db.Person where obj.ID == ID select new { ID = obj.ID, FirstName = obj.FirstName, LastName = obj.LastName, EnrollmentDate = obj.EnrollmentDate };
            return new JsonResult() { Data = query, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult Update(Person person)
        {
            db.Entry(person).State = EntityState.Modified;
            var query = db.SaveChanges();
            var hasil = "";
            if(query == 1)
            {
              hasil = "benar";
            }  
            else
            {
                hasil = "salah";
            }
              return Json(hasil, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            Person pelajar = db.Person.Find(ID);
                db.Person.Remove(pelajar);
            var result = db.SaveChanges();
            var hasil = "";
            if(result == 1)
            {
                hasil = "benar";
            }
            else
            {
                hasil = "salah";
            }
            return Json(hasil, JsonRequestBehavior.AllowGet);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}