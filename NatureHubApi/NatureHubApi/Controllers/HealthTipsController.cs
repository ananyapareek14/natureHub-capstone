using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NatureHubApi.Data;
using NatureHubApi.Model;

namespace NatureHubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthTipsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HealthTipsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/HealthTips
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HealthTip>>> GetHealthTips()
        {
            return await _context.HealthTips.ToListAsync();
        }

        // GET: api/HealthTips/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HealthTip>> GetHealthTip(int id)
        {
            var healthTip = await _context.HealthTips.FindAsync(id);

            if (healthTip == null)
            {
                return NotFound();
            }

            return healthTip;
        }

        // PUT: api/HealthTips/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHealthTip(int id, HealthTip healthTip)
        {
            if (id != healthTip.Id)
            {
                return BadRequest();
            }

            _context.Entry(healthTip).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HealthTipExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HealthTips
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HealthTip>> PostHealthTip(HealthTip healthTip)
        {
            _context.HealthTips.Add(healthTip);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHealthTip", new { id = healthTip.Id }, healthTip);
        }

        // DELETE: api/HealthTips/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHealthTip(int id)
        {
            var healthTip = await _context.HealthTips.FindAsync(id);
            if (healthTip == null)
            {
                return NotFound();
            }

            _context.HealthTips.Remove(healthTip);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HealthTipExists(int id)
        {
            return _context.HealthTips.Any(e => e.Id == id);
        }
    }
}
