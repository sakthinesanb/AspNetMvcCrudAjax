using CrudAjaxMVC.Models;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CrudAjaxMVC.Controllers
{
    public class CustomerController : Controller
    {
        Sakthinesan_DBEntities db = new Sakthinesan_DBEntities();
        string fDateFormat = "MMM dd, yyyy hh:mm tt";
        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetCustomerList(int customerId=0, string SearchTerm = "")
        {
            string sReturnValue = "OK";
            List<tbl_Customers> CustomerList = null;
            tbl_Customers customer = null;
            try
            {
                if (customerId != 0)
                {
                    customer = db.tbl_Customers.Where(x => x.CustomerID == customerId).FirstOrDefault();
                    customer.strDate=customer.Date.ToString(fDateFormat);
                    return Json(new { Result = sReturnValue, Data = customer }, JsonRequestBehavior.AllowGet);

                }
                else if (!string.IsNullOrEmpty(SearchTerm))
                {
                    CustomerList = db.tbl_Customers.Where(x => x.CustomerName.Contains(SearchTerm)).ToList();
                }
                else
                {
                    CustomerList = db.tbl_Customers.ToList();
                    //return Json(new { Result = sReturnValue, Data = CustomerList }, JsonRequestBehavior.AllowGet);
                }

                if(CustomerList.Count > 0)
                {
                    foreach (tbl_Customers customers in CustomerList)
                    {
                        customers.strDate = customers.Date.ToString(fDateFormat);
                    }
                }
                

            }
            catch (Exception ex)
            {
                sReturnValue = ex.Message;
            }
            return Json(new { Result = sReturnValue, Data = CustomerList }, JsonRequestBehavior.AllowGet);
        }
        // Adding: Customer
        public ActionResult CreateCustomer()
        {
            return View();
        }

        public ActionResult CreateCustomerData(tbl_Customers customers)
        {
            string sReturnValue = "OK";
            int iInsertedRecords = 0;
            try
            {
                customers.Date = DateTime.Now;
                db.tbl_Customers.Add(customers);
                iInsertedRecords = db.SaveChanges();
            }
            catch (Exception ex)
            {
                sReturnValue = ex.Message;
            }
            return Json(new { Result = sReturnValue, Data = iInsertedRecords }, JsonRequestBehavior.AllowGet);
        }
        // Edit: Customer
        public ActionResult UpdateCustomer( int customerId=0)
        {
            ViewBag.customerId = customerId;
            return View();
        }

        public ActionResult UpdateCustomerData( tbl_Customers customers)
        {
            string sReturnValue = "OK";
            int iUpdatedRecords = 0;
            tbl_Customers customer = null;
            try
            {
                customer = db.tbl_Customers.Where(x => x.CustomerID == customers.CustomerID).FirstOrDefault();
                customer.ProductID = customers.ProductID;
                customer.CustomerName = customers.CustomerName;
                customer.CustomerNO = customers.CustomerNO;
                customer.Quantity = customers.Quantity;
                customer.Total=customers.Total;
                customer.Date = customers.Date;
                iUpdatedRecords=db.SaveChanges();
            }
            catch (Exception ex)
            {
                sReturnValue = ex.Message;
            }
            return Json(new { Result = sReturnValue, Data = iUpdatedRecords }, JsonRequestBehavior.AllowGet);                       
        }
        // Deleting 
        public ActionResult DeleteCustomer(int customerId = 0)
        {
            ViewBag.customerId = customerId;
            return View();
        }

        public ActionResult DeleteCustomerData(int customerId = 0)
        {
            string sReturnValue = "OK";
            try
            {
                db.tbl_Customers.RemoveRange(db.tbl_Customers.Where(x => x.CustomerID==customerId));
                db.SaveChanges();
            }
            catch(Exception ex)
            {
                sReturnValue = ex.Message;
            }
            return Json(sReturnValue, JsonRequestBehavior.AllowGet);
        }

        public ActionResult IndexSearch(string SearchTerm="")
        {
            string sReturnValue = "OK";
            List<tbl_Customers> CustomerList = null;
            try
            {
                CustomerList = db.tbl_Customers.Where(x => x.CustomerName.Contains(SearchTerm)).ToList();                
            }
            catch (Exception ex) 
            {
                sReturnValue = ex.Message;
            }
            return Json(new { Result = sReturnValue, Data = CustomerList }, JsonRequestBehavior.AllowGet);

        }


    }
}