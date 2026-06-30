import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Mail,
  Phone,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/services/customerService";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [customerList, setCustomerList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  const [showAddModal, setShowAddModal] = useState(false);

const [showEditModal, setShowEditModal] = useState(false);

const [saving, setSaving] = useState(false);

const [editingCustomer, setEditingCustomer] =
  useState<any>(null);

const [newCustomer, setNewCustomer] = useState({
  name: "",
  phone: "",
  email: "",
  gst_number: "",
  address: "",
  credit_limit: "",
});

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomerList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

const handleEditCustomer = (customer: any) => {
  setEditingCustomer({
    ...customer,
  });

  setShowEditModal(true);
};

const handleUpdateCustomer = async () => {
  if (!editingCustomer) return;

  try {
    setSaving(true);

    await updateCustomer(editingCustomer.id, {
      name: editingCustomer.name,
      phone: editingCustomer.phone,
      email: editingCustomer.email,
      gst_number: editingCustomer.gst_number,
      address: editingCustomer.address,
      credit_limit: Number(editingCustomer.credit_limit),
    });

    setShowEditModal(false);
    setEditingCustomer(null);

    await loadCustomers();
  } catch (error) {
    console.error(error);
    alert("Unable to update customer.");
  } finally {
    setSaving(false);
  }
};

const handleDeleteCustomer = async (id: number) => {
  if (!confirm("Delete this customer?")) return;

  try {
    await deleteCustomer(id);
    await loadCustomers();
  } catch (error) {
    console.error(error);
    alert("Unable to delete customer.");
  }
};


  const handleAddCustomer = async () => {
  try {
    setSaving(true);

    await createCustomer({
      ...newCustomer,
      credit_limit: Number(newCustomer.credit_limit),
    });

    await loadCustomers();

    setShowAddModal(false);

    setNewCustomer({
      name: "",
      phone: "",
      email: "",
      gst_number: "",
      address: "",
      credit_limit: "",
    });

    alert("Customer added successfully.");
  } catch (error) {
    console.error(error);
    alert("Unable to add customer.");
  } finally {
    setSaving(false);
  }
};

  const filtered = customerList.filter(
    (c: any) =>
      (c.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.phone ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        Loading Customers...
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
            Customer Management
          </h1>

          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
            }}
          >
            {customerList.length} Customers
          </p>
        </div>
        
        <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
             >
            <Plus size={16} />
             Add Customer
        </button>

      </div>

      <div
        style={{
          position: "relative",
          marginBottom: "1.25rem",
          maxWidth: 400,
        }}
      >
        <Search
          size={16}
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)",
          }}
        />

        <input
          className="input-field"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            paddingLeft: 36,
            width: "100%",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(380px,1fr))",
          gap: "1rem",
        }}
      >        
      {filtered.map((c: any) => (
          <div
            key={c.id}
            className="glass-card"
            style={{ padding: "1.5rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, var(--color-accent-500), var(--color-secondary-500))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "white",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {c.name?.charAt(0) || "C"}
                </div>

                <div>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "1rem",
                      marginBottom: "0.15rem",
                    }}
                  >
                    {c.name}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {c.email || "No Email"}
                  </p>
                </div>
              </div>

              <span className="badge badge-info">
                Customer
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  background: "var(--bg-tertiary)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                  }}
                >
                  Credit Limit
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  {formatCurrency(c.credit_limit ?? 0)}
                </div>
              </div>

              <div
                style={{
                  padding: "0.75rem",
                  background: "var(--bg-tertiary)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                  }}
                >
                  Outstanding
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color:
                      (c.outstanding_amount ?? 0) > 0
                        ? "var(--color-danger-400)"
                        : "var(--color-success-400)",
                  }}
                >
                  {formatCurrency(c.outstanding_amount ?? 0)}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <Phone size={14} />
                {c.phone || "-"}
              </span>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <Mail size={14} />
                {c.email || "-"}
              </span>

              <div
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                }}
              >
                GST Number: {c.gst_number || "-"}
              </div>

              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                }}
              >
                Address: {c.address || "-"}
              </div>
              <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "16px",
  }}
>
  <button
  className="btn btn-secondary"
  onClick={() => handleEditCustomer(c)}
>
  <Pencil size={16} />
  Edit
</button>

  <button
    className="btn btn-danger"
    onClick={() => handleDeleteCustomer(c.id)}
  >
    <Trash2 size={16} />
    Delete
  </button>
</div>
            </div>
          </div>
        ))}
      </div>
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
        width: 550,
        maxWidth: "95%",
        padding: "28px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Add Customer</h2>

        <button
          className="btn btn-secondary"
          onClick={() => setShowAddModal(false)}
        >
          <X size={18} />
        </button>
      </div>

      <input
        className="input-field"
        placeholder="Customer Name"
        value={newCustomer.name}
        onChange={(e) =>
          setNewCustomer({
            ...newCustomer,
            name: e.target.value,
          })
        }
      />

      <input
        className="input-field"
        placeholder="Phone"
        value={newCustomer.phone}
        onChange={(e) =>
          setNewCustomer({
            ...newCustomer,
            phone: e.target.value,
          })
        }
        style={{ marginTop: 12 }}
      />

      <input
        className="input-field"
        placeholder="Email"
        value={newCustomer.email}
        onChange={(e) =>
          setNewCustomer({
            ...newCustomer,
            email: e.target.value,
          })
        }
        style={{ marginTop: 12 }}
      />

      <input
        className="input-field"
        placeholder="GST Number"
        value={newCustomer.gst_number}
        onChange={(e) =>
          setNewCustomer({
            ...newCustomer,
            gst_number: e.target.value,
          })
        }
        style={{ marginTop: 12 }}
      />

      <input
        className="input-field"
        placeholder="Address"
        value={newCustomer.address}
        onChange={(e) =>
          setNewCustomer({
            ...newCustomer,
            address: e.target.value,
          })
        }
        style={{ marginTop: 12 }}
      />

      <input
        className="input-field"
        placeholder="Credit Limit"
        type="number"
        value={newCustomer.credit_limit}
        onChange={(e) =>
          setNewCustomer({
            ...newCustomer,
            credit_limit: e.target.value,
          })
        }
        style={{ marginTop: 12 }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          marginTop: 24,
        }}
      >
        <button
          className="btn btn-secondary"
          onClick={() => setShowAddModal(false)}
        >
          Cancel
        </button>

        <button
          className="btn btn-primary"
          onClick={handleAddCustomer}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Customer"}
        </button>
      </div>
    </div>
  </div>
)}

{showEditModal && editingCustomer && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      className="glass-card"
      style={{
        width: 500,
        padding: 24,
      }}
    >
      <h2
        style={{
          marginBottom: 20,
          fontWeight: 700,
        }}
      >
        Edit Customer
      </h2>

      <input
        className="input-field"
        placeholder="Name"
        value={editingCustomer.name}
        onChange={(e) =>
          setEditingCustomer({
            ...editingCustomer,
            name: e.target.value,
          })
        }
      />

      <input
        className="input-field"
        placeholder="Phone"
        value={editingCustomer.phone}
        onChange={(e) =>
          setEditingCustomer({
            ...editingCustomer,
            phone: e.target.value,
          })
        }
      />

      <input
        className="input-field"
        placeholder="Email"
        value={editingCustomer.email}
        onChange={(e) =>
          setEditingCustomer({
            ...editingCustomer,
            email: e.target.value,
          })
        }
      />

      <input
        className="input-field"
        placeholder="GST Number"
        value={editingCustomer.gst_number}
        onChange={(e) =>
          setEditingCustomer({
            ...editingCustomer,
            gst_number: e.target.value,
          })
        }
      />

      <input
        className="input-field"
        placeholder="Address"
        value={editingCustomer.address}
        onChange={(e) =>
          setEditingCustomer({
            ...editingCustomer,
            address: e.target.value,
          })
        }
      />

      <input
        className="input-field"
        placeholder="Credit Limit"
        value={editingCustomer.credit_limit}
        onChange={(e) =>
          setEditingCustomer({
            ...editingCustomer,
            credit_limit: e.target.value,
          })
        }
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 20,
        }}
      >
        <button
          className="btn btn-secondary"
          onClick={() => setShowEditModal(false)}
        >
          Cancel
        </button>

        <button
          className="btn btn-primary"
          onClick={handleUpdateCustomer}
          disabled={saving}
        >
          {saving ? "Updating..." : "Update Customer"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}