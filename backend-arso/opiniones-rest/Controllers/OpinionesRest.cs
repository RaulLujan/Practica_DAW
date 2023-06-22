using Opiniones.Modelo;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Opiniones.Servicio;

namespace OpinionesApi.Controllers
{
    [Route("api/opiniones")]
    [ApiController]
    public class OpinionesController : ControllerBase
    {
        private readonly IServicioOpiniones _servicio;

        public OpinionesController(IServicioOpiniones servicio)
        {
            _servicio = servicio;
        }

        public ActionResult<List<Opinion>> Get() =>
            _servicio.GetAll();

        [HttpGet("{id}", Name = "GetOpinion")]
        public ActionResult<Opinion> Get(string id)
        {
            var entidad = _servicio.Get(id);

            if (entidad == null)
            {
                return NotFound();
            }

            return entidad;
        }

        [HttpPost]
        public string Create(Opinion Opinion)
        {
            return  "{\"id\" : \"" +_servicio.Create(Opinion) + "\" }" ;
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, Opinion Opinion)
        {
            var entidad = _servicio.Get(id);

            if (entidad == null)
            {
                return NotFound();
            }

            _servicio.Update(id, Opinion);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var Opinion = _servicio.Get(id);

            if (Opinion == null)
            {
                return NotFound();
            }

            _servicio.Remove(id);

            return NoContent();
        }

        [HttpPut("addvaloracion/{id}")]
        public IActionResult AddValoracion(string id, Valoracion valoracion)
        {
            var entidad = _servicio.Get(id);

            if (entidad == null)
            {
                return NotFound();
            }

            _servicio.AddValoracion(id, valoracion);

            return NoContent();
        }


        [HttpPut("updatevaloracion/{id}")]
        public IActionResult UpdateValoracion(string id, Valoracion valoracion)
        {
            var entidad = _servicio.Get(id);

            if (entidad == null)
            {
                return NotFound();
            }

            _servicio.UpdateValoracion(id, valoracion);

            return NoContent();
        }

        [HttpGet("valoracion/{id}/{IdUser}")]
        public ActionResult<Valoracion> GetValoracion(string id, string IdUser)
        {
            var entidad = _servicio.GetValoracion(id, IdUser);

            if (entidad == null)
            {
                return NotFound();
            }

            return entidad;
        }

    }

}
