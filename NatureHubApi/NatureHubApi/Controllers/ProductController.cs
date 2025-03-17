using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NatureHubApi.Model.Domain;
using NatureHubApi.Repos.Interface;

namespace NatureHubApi.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        // ✅ Get all products
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productRepository.GetAllProductsAsync();
            if (!products.Any())
                return NotFound("No products found.");

            return Ok(products);
        }

        // ✅ Get a product by ID
        [HttpGet("{productId}")]
        public async Task<IActionResult> GetProductById(Guid productId)
        {
            var product = await _productRepository.GetProductByIdAsync(productId);
            if (product == null)
                return NotFound("Product not found.");

            return Ok(product);
        }

        // ✅ Get products by category
        [HttpGet("category/{category}")]
        public async Task<IActionResult> GetProductsByCategory(string category)
        {
            var products = await _productRepository.GetProductsByCategoryAsync(category);
            if (!products.Any())
                return NotFound($"No products found in category: {category}");

            return Ok(products);
        }

        // ✅ Add a new product
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            if (product == null)
                return BadRequest("Invalid product data.");

            var createdProduct = await _productRepository.AddProductAsync(product);
            return CreatedAtAction(nameof(GetProductById), new { productId = createdProduct.Id }, createdProduct);
        }
    }
}
