import { useEffect, useState } from "react";

import {
  Search,
  Plus,
  AlertTriangle,
  Package,
  X,
} from "lucide-react";

import {
  formatCurrency,
  formatNumber,
} from "@/lib/utils";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";

export default function InventoryPage() {
  const [loading, setLoading] = useState(true);

  const [productList, setProductList] = useState<any[]>([]);

  const [tab, setTab] = useState<
    "products" | "transactions" | "warehouses"
  >("products");

  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    unit: "Ton",
  });

  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();

      setProductList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      setSaving(true);

      await createProduct({
  name: newProduct.name,
  category: newProduct.category,

  brand: "Jayasree",

  description: newProduct.name,

  price: Number(newProduct.price),

  mrp: Number(newProduct.price),

  stock: Number(newProduct.stock),

  unit: newProduct.unit,

  image: "",

  rating: 5,

  review_count: 0,

  min_order_qty: 1,

  slug: newProduct.name
    .toLowerCase()
    .replace(/\s+/g, "-"),
});

      await loadProducts();

      setShowAddModal(false);

      setNewProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
        unit: "Ton",
      });
    } catch (error) {
      console.error(error);

      alert("Failed to add product.");
    } finally {
      setSaving(false);
    }
  };
  const handleEdit = (product: any) => {
  setEditingProduct({ ...product });
  setShowEditModal(true);
};

const handleDelete = async (id: number) => {
  const ok = window.confirm("Delete this product?");

  if (!ok) return;

  try {
    await deleteProduct(id);
    await loadProducts();
  } catch (error) {
    console.error(error);
    alert("Unable to delete product.");
  }
};
const handleUpdateProduct = async () => {
  if (!editingProduct) return;

  try {
    setSaving(true);

    await updateProduct(editingProduct.id,{
    name: editingProduct.name,
    category: editingProduct.category,

    brand: editingProduct.brand || "Jayasree",

    description: editingProduct.description || editingProduct.name,

    price:Number(editingProduct.price),

    mrp: editingProduct.mrp || Number(editingProduct.price),

    stock:Number(editingProduct.stock),

    unit:editingProduct.unit,

    image: editingProduct.image || "",

    rating: editingProduct.rating || 5,

    review_count: editingProduct.review_count || 0,

    min_order_qty: editingProduct.min_order_qty || 1,

    slug:
      editingProduct.slug ||
      editingProduct.name.toLowerCase().replace(/\s+/g,"-"),
});

    setShowEditModal(false);
    setEditingProduct(null);

    await loadProducts();
  } catch (error) {
    console.error(error);
    alert("Unable to update product.");
  } finally {
    setSaving(false);
  }
};



  const filteredProducts = productList.filter(
    (p: any) =>
      p.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (p.category ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const lowStockProducts = productList.filter(
    (p: any) => p.stock <= 10
  );

  if (loading) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          fontSize: 18,
        }}
      >
        Loading Inventory...
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 800,
            }}
          >
            Inventory Management
          </h1>

          <p
            style={{
              color: "var(--text-muted)",
              fontSize: ".85rem",
            }}
          >
            {productList.length} Products
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            setShowAddModal(true)
          }
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>
            {lowStockProducts.length > 0 && (
        <div
          style={{
            padding: "1rem",
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: 12,
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: ".75rem",
          }}
        >
          <AlertTriangle
            size={20}
            color="orange"
          />

          <div>
            <strong>
              Low Stock Alert
            </strong>

            <div
              style={{
                fontSize: ".85rem",
              }}
            >
              {lowStockProducts
                .map((p) => p.name)
                .join(", ")}
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: ".5rem",
          marginBottom: "1rem",
        }}
      >
        <button
          className={`tab-item ${
            tab === "products"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setTab("products")
          }
        >
          Products
        </button>

        <button
          className={`tab-item ${
            tab === "transactions"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setTab("transactions")
          }
        >
          Transactions
        </button>

        <button
          className={`tab-item ${
            tab === "warehouses"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setTab("warehouses")
          }
        >
          Warehouses
        </button>
      </div>

      <div
        style={{
          position: "relative",
          marginBottom: "1rem",
          maxWidth: 400,
        }}
      >
        <Search
          size={16}
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform:
              "translateY(-50%)",
          }}
        />

        <input
          className="input-field"
          placeholder="Search Product..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            paddingLeft: 36,
            width: "100%",
          }}
        />
      </div>

      {tab === "products" && (
        <div
          className="glass-card"
          style={{
            padding: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table className="data-table">
              <thead>
                <tr>
  <th>Product</th>
  <th>SKU</th>
  <th>Category</th>
  <th>Stock</th>
  <th>Reorder Level</th>
  <th>Price</th>
  <th>Value</th>
  <th>Status</th>
  <th>Actions</th>
</tr>
              </thead>

              <tbody>
                {filteredProducts.map(
                  (p: any) => (
                    <tr key={p.id}>
                      <td>
                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: ".75rem",
                          }}
                        >
                          <Package
                            size={18}
                          />

                          {p.name}
                        </div>
                      </td>

                      <td>
                        {p.category}
                      </td>

                      <td>
                        {formatNumber(
                          p.stock
                        )}{" "}
                        {p.unit}
                      </td>

                      <td>
                        {formatCurrency(
                          p.price
                        )}
                      </td>

                      <td>
                        {formatCurrency(
                          p.stock *
                            p.price
                        )}
                      </td>

                      <td>
  <span
    className={`badge ${
      p.stock > 10
        ? "badge-success"
        : "badge-danger"
    }`}
  >
    {p.stock > 10 ? "In Stock" : "Low Stock"}
  </span>
</td>

<td>
  <div
    style={{
      display: "flex",
      gap: "8px",
    }}
  >
    <button
      className="btn btn-secondary"
      onClick={() => handleEdit(p)}
    >
      Edit
    </button>

    <button
      className="btn btn-danger"
      onClick={() => handleDelete(p.id)}
    >
      Delete
    </button>
  </div>
</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
            {showAddModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="glass-card"
            style={{
              width: 500,
              maxWidth: "95%",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                }}
              >
                Add Product
              </h2>

              <button
                className="btn btn-secondary"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                <X size={16} />
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gap: "1rem",
              }}
            >
              <input
                className="input-field"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value,
                  })
                }
              />

              <input
                className="input-field"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    category: e.target.value,
                  })
                }
              />

              <input
                type="number"
                className="input-field"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value,
                  })
                }
              />

              <input
                type="number"
                className="input-field"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock: e.target.value,
                  })
                }
              />

              <select
                className="input-field"
                value={newProduct.unit}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    unit: e.target.value,
                  })
                }
              >
                <option>Ton</option>
                <option>Kg</option>
                <option>Bag</option>
                <option>Piece</option>
              </select>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: ".75rem",
                  marginTop: ".5rem",
                }}
              >
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleAddProduct}
                >
                  {saving
                    ? "Saving..."
                    : "Save Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && editingProduct && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}
  >
    <div
      className="glass-card"
      style={{
        width: 500,
        maxWidth: "95%",
        padding: "1.5rem",
      }}
    >
      <h2
        style={{
          marginBottom: "1rem",
        }}
      >
        Edit Product
      </h2>

      <input
        className="input-field"
        value={editingProduct.name}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            name: e.target.value,
          })
        }
        placeholder="Product Name"
      />

      <input
        className="input-field"
        value={editingProduct.category}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            category: e.target.value,
          })
        }
        placeholder="Category"
      />

      <input
        type="number"
        className="input-field"
        value={editingProduct.price}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            price: Number(e.target.value),
          })
        }
        placeholder="Price"
      />

      <input
        type="number"
        className="input-field"
        value={editingProduct.stock}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            stock: Number(e.target.value),
          })
        }
        placeholder="Stock"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          className="btn btn-secondary"
          onClick={() =>
            setShowEditModal(false)
          }
        >
          Cancel
        </button>

        <button
          className="btn btn-primary"
          onClick={handleUpdateProduct}
        >
          Update Product
        </button>
      </div>
    </div>
  </div>
)}



            {tab === "transactions" && (
        <div
          className="glass-card"
          style={{
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h3>Inventory Transactions</h3>

          <p
            style={{
              color: "var(--text-muted)",
            }}
          >
            Transaction history will be connected
            in the next step.
          </p>
        </div>
      )}

      {tab === "warehouses" && (
        <div
          className="glass-card"
          style={{
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h3>Warehouses</h3>

          <p
            style={{
              color: "var(--text-muted)",
            }}
          >
            Warehouse management will be added
            in the next module.
          </p>
        </div>
      )}
    </div>
  );
}