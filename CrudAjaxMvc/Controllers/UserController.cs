using CrudAjaxMVC.Models;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CrudAjaxMVC.Controllers
{
    public class UserController : Controller
    {
        Sakthinesan_DBEntities db = new Sakthinesan_DBEntities();
        // GET: User
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult userLogin(string username="",String password="")
        {
            string sReturnValue = "OK";
            User user = null;
            try
            {
                user = db.Users.Where(x => x.Username == username).FirstOrDefault();

                if(user != null && !string.IsNullOrEmpty(user.Username))
                {
                    if(user.Password == password)
                    {
                        //Valid User
                        return RedirectToAction("Customer", "Index");
                    }
                    else
                    {
                        sReturnValue = "Incorrect password!";
                    }
                }
                else
                {
                    sReturnValue = "Invalid User Name!";
                }
               
            }
            catch (Exception ex)
            {
                sReturnValue = ex.Message;
            }
            return Json(new { Result = sReturnValue}, JsonRequestBehavior.AllowGet);
        }
    }
}