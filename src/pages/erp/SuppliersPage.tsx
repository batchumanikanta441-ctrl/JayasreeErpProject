import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Star,
  Phone,
  Mail,
  MapPin,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { formatCurrency } from "@/lib/utils";

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "@/services/supplierService";

export default function SuppliersPage() {
  const [search, setSearch] = useState("");

  const [supplierList, setSupplierList] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [saving, setSaving] = useState(false);

  const [editingSupplier, setEditingSupplier] =
    useState<any>(null);

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    phone: "",
    email: "",
    gst_number: "",
    address: "",
    material_type: "",
  });

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSupplierList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSupplier = async () => {
    try {
      setSaving(true);

      await createSupplier({
        name: newSupplier.name,
        phone: newSupplier.phone,
        email: newSupplier.email,
        gst_number: newSupplier.gst_number,
        address: newSupplier.address,
        material_type: newSupplier.material_type,
      });

      await loadSuppliers();

      setShowAddModal(false);

      setNewSupplier({
        name: "",
        phone: "",
        email: "",
        gst_number: "",
        address: "",
        material_type: "",
      });

      alert("Supplier added successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to add supplier.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditSupplier = (supplier: any) => {
    setEditingSupplier({
      ...supplier,
    });

    setShowEditModal(true);
  };

  const handleUpdateSupplier = async () => {
    if (!editingSupplier) return;

    try {
      setSaving(true);

      await updateSupplier(editingSupplier.id, {
        name: editingSupplier.name,
        phone: editingSupplier.phone,
        email: editingSupplier.email,
        gst_number: editingSupplier.gst_number,
        address: editingSupplier.address,
        material_type:
          editingSupplier.material_type,
      });

      await loadSuppliers();

      setShowEditModal(false);

      setEditingSupplier(null);

      alert("Supplier updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to update supplier.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSupplier = async (
    id: number
  ) => {
    if (!confirm("Delete this supplier?"))
      return;

    try {
      await deleteSupplier(id);

      await loadSuppliers();

      alert("Supplier deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to delete supplier.");
    }
  };

  const filtered = supplierList.filter(
    (s: any) =>
      (s.name ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (s.phone ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
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
        Loading Suppliers...
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
            Supplier Management
          </h1>

          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
            }}
          >
            {supplierList.length} Suppliers
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={16} />
          Add Supplier
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
          placeholder="Search suppliers..."
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
          gridTemplateColumns:
            "repeat(auto-fill,minmax(400px,1fr))",
          gap: "1rem",
        }}
      >
        {filtered.map((s: any) => (
          <div
            key={s.id}
            className="glass-card"
            style={{ padding: "1.5rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  {s.name}
                </h3>

                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.85rem",
                  }}
                >
                  Supplier
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Star
                  size={15}
                  fill="#fbbf24"
                  color="#fbbf24"
                />
                <span>5.0</span>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  padding: "12px",
                  background: "var(--bg-tertiary)",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "gray",
                  }}
                >
                  Outstanding
                </div>

                <div
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {formatCurrency(
                    s.outstanding_amount ?? 0
                  )}
                </div>
              </div>

              <div
                style={{
                  padding: "12px",
                  background: "var(--bg-tertiary)",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "gray",
                  }}
                >
                  GST
                </div>

                <div
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {s.gst_number}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                color: "var(--text-muted)",
              }}
            >
              <span>
                <Phone size={13} /> {s.phone}
              </span>

              <span>
                <Mail size={13} /> {s.email}
              </span>

              <span>
                <MapPin size={13} /> {s.address}
              </span>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Material: {s.material_type}
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
                  onClick={() =>
                    handleEditSupplier(s)
                  }
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    handleDeleteSupplier(s.id)
                  }
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
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="glass-card"
            style={{
              width: 550,
              maxWidth: "95%",
              padding: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <h2>Add Supplier</h2>

              <button
                className="btn btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <input
              className="input-field"
              placeholder="Supplier Name"
              value={newSupplier.name}
              onChange={(e) =>
                setNewSupplier({
                  ...newSupplier,
                  name: e.target.value,
                })
              }
            />

            <input
              className="input-field"
              placeholder="Phone"
              value={newSupplier.phone}
              onChange={(e) =>
                setNewSupplier({
                  ...newSupplier,
                  phone: e.target.value,
                })
              }
              style={{ marginTop: 12 }}
            />

            <input
              className="input-field"
              placeholder="Email"
              value={newSupplier.email}
              onChange={(e) =>
                setNewSupplier({
                  ...newSupplier,
                  email: e.target.value,
                })
              }
              style={{ marginTop: 12 }}
            />

            <input
              className="input-field"
              placeholder="GST Number"
              value={newSupplier.gst_number}
              onChange={(e) =>
                setNewSupplier({
                  ...newSupplier,
                  gst_number: e.target.value,
                })
              }
              style={{ marginTop: 12 }}
            />

            <input
              className="input-field"
              placeholder="Address"
              value={newSupplier.address}
              onChange={(e) =>
                setNewSupplier({
                  ...newSupplier,
                  address: e.target.value,
                })
              }
              style={{ marginTop: 12 }}
            />

            <input
              className="input-field"
              placeholder="Material Type"
              value={newSupplier.material_type}
              onChange={(e) =>
                setNewSupplier({
                  ...newSupplier,
                  material_type: e.target.value,
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
                onClick={handleAddSupplier}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Supplier"}
              </button>
            </div>
          </div>
        </div>
      )}
            {showEditModal && editingSupplier && (
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
              width: 550,
              maxWidth: "95%",
              padding: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <h2>Edit Supplier</h2>

              <button
                className="btn btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <input
              className="input-field"
              value={editingSupplier.name}
              onChange={(e) =>
                setEditingSupplier({
                  ...editingSupplier,
                  name: e.target.value,
                })
              }
            />

            <input
              className="input-field"
              value={editingSupplier.phone}
              onChange={(e) =>
                setEditingSupplier({
                  ...editingSupplier,
                  phone: e.target.value,
                })
              }
              style={{ marginTop: 12 }}
            />

            <input
              className="input-field"
              value={editingSupplier.email}
              onChange={(e) =>
                setEditingSupplier({
                  ...editingSupplier,
                  email: e.target.value,
                })
              }
              style={{ marginTop: 12 }}
            />

            <input
              className="input-field"
              value={editingSupplier.gst_number}
              onChange={(e) =>
                setEditingSupplier({
                  ...editingSupplier,
                  gst_number: e.target.value,
                })
              }
              style={{ marginTop: 12 }}
            />

            <input
              className="input-field"
              value={editingSupplier.address}
              onChange={(e) =>
                setEditingSupplier({
                  ...editingSupplier,
                  address: e.target.value,
                })
              }
              style={{ marginTop: 12 }}
            />

            <input
              className="input-field"
              value={editingSupplier.material_type}
              onChange={(e) =>
                setEditingSupplier({
                  ...editingSupplier,
                  material_type: e.target.value,
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
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={handleUpdateSupplier}
                disabled={saving}
              >
                {saving ? "Updating..." : "Update Supplier"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}