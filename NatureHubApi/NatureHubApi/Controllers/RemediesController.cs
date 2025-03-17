using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NatureHubApi.Data;
using NatureHubApi.Model.Domain;

namespace NatureHubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RemediesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RemediesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Remedies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Remedy>>> GetRemedies()
        {
            return await _context.Remedies.ToListAsync();
        }

        // GET: api/Remedies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Remedy>> GetRemedy(int id)
        {
            var remedy = await _context.Remedies.FindAsync(id);

            if (remedy == null)
            {
                return NotFound();
            }

            return remedy;
        }

        // PUT: api/Remedies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRemedy(int id, Remedy remedy)
        {
            if (id != remedy.Id)
            {
                return BadRequest();
            }

            _context.Entry(remedy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RemedyExists(id))
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

        // POST: api/Remedies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Remedy>> PostRemedy(Remedy remedy)
        {
            _context.Remedies.Add(remedy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRemedy", new { id = remedy.Id }, remedy);
        }

        // DELETE: api/Remedies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRemedy(int id)
        {
            var remedy = await _context.Remedies.FindAsync(id);
            if (remedy == null)
            {
                return NotFound();
            }

            _context.Remedies.Remove(remedy);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RemedyExists(int id)
        {
            return _context.Remedies.Any(e => e.Id == id);
        }
    }
}
