using CrudAjaxMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CrudAjaxMVC.Controllers
{
    public class HomeController : Controller
    {
        Sakthinesan_DBEntities db = new Sakthinesan_DBEntities();
        public ActionResult Index(string Notification="")
        {
            ViewBag.Notification = Notification;
            return View();
        }

        public JsonResult GetProductList(int ProId = 0)
        {
            string sReturnValue = "OK";
            List<tbl_Products> prodList = null;
            tbl_Products prod = null;
            try
            {
                if (ProId != 0)
                {
                    prod = db.tbl_Products.Where(x => x.ProductID == ProId).FirstOrDefault();
                }
                else
                {
                    prodList = db.tbl_Products.ToList();
                    return Json(new { Result = sReturnValue, Data = prodList }, JsonRequestBehavior.AllowGet);
                }
            }
            catch(Exception ex)
            {
                sReturnValue = ex.Message;
            }
            return Json(new { Result = sReturnValue, Data = prod }, JsonRequestBehavior.AllowGet);


        }

        public ActionResult Create(int ProId=0, string Page="")
        {
            ViewBag.ProdId = ProId;
            ViewBag.Page = Page;
            return View();
        }

        public ActionResult CreateOrUpdateProduct(tbl_Products tbl_Products)
        {
            string sReturnValue = "OK";
            int iInsertedRecords = 0;
            tbl_Products prod = null;
            try
            {

                if (tbl_Products.ProductID == 0)
                {
                    db.tbl_Products.Add(tbl_Products);
                    iInsertedRecords = db.SaveChanges();
                }
                else
                {
                    prod = db.tbl_Products.Where(x => x.ProductID == tbl_Products.ProductID).FirstOrDefault();
                    prod.ProductName = tbl_Products.ProductName;
                    prod.ProductNO = tbl_Products.ProductNO;
                    prod.Price = tbl_Products.Price;
                    prod.Category = tbl_Products.Category;

                    iInsertedRecords = db.SaveChanges();
                }

                
            }
            catch(Exception ex)
            {
                sReturnValue = ex.Message;
            }
            return Json(new { Result = sReturnValue, Data = iInsertedRecords }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Edit(int ProId = 0)
        {
            ViewBag.ProdId = ProId;
            return View();
        }

        public ActionResult Delete(int ProId = 0)
        {
            ViewBag.ProdId = ProId;
            return View();
        }

        public JsonResult DeleteProduct(int ProId = 0)
        {
            string sReturnValue = "OK";
            try
            {
                db.tbl_Products.RemoveRange(db.tbl_Products.Where(x => x.ProductID == ProId));
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                sReturnValue = ex.Message;
            }
            return Json(sReturnValue, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetProduct(int ProId=0)
        {
            string sReturnValue = "OK";
            tbl_Products prod = null;
            try
            {
                prod = db.tbl_Products.Where(x => x.ProductID == ProId).FirstOrDefault();
                //prod = db.tbl_Products.ToList();
            }
            catch (Exception ex)
            {
                sReturnValue = ex.Message;
            }

            return Json(new { Result = sReturnValue, Data = prod }, JsonRequestBehavior.AllowGet);
        }
    }
}