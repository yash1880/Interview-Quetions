
import { useEffect, useMemo, useState } from "react";
import FilterBar from "../components/FilterBar.jsx";
import Header from "../components/Header.jsx";
import QuestionDetails from "../components/QuestionDetails.jsx";
import QuestionForm from "../components/QuestionForm.jsx";
import QuestionTable from "../components/QuestionTable.jsx";
import SummaryCards from "../components/SummaryCards.jsx";

const API_URL = "http://localhost:5000/questions";
const DEFAULT_CATEGORIES = ["React JS", "JavaScript", "Node.js", "DSA", "System Design", "HTML/CSS"];
const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];
const STATUS_OPTIONS = ["Solved", "To Revise", "Not Solved"];

const getToday = () => {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

const defaultForm = () => ({
  title: "",
  category: "React JS",
  difficulty: "Medium",
  status: "Not Solved",
  notes: "",
  lastPracticed: getToday(),
});

async function requestQuestions() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`Request failed with HTTP ${response.status}`);
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error("The questions response was not a list");
  return data;
}

export default function Dashboard() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadFailed, setLoadFailed] = useState(false);

  const categoryOptions = useMemo(() => [...new Set([
    ...DEFAULT_CATEGORIES,
    ...questions.map((question) => question.category).filter(Boolean),
  ])], [questions]);

  const fetchQuestions = async () => {
    try {
      setQuestions(await requestQuestions());
      setLoadFailed(false);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setQuestions([]);
      setLoadFailed(true);
      setErrorMessage(`Could not load questions. Check that JSON Server is running on port 5000. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isCurrent = true;

    requestQuestions()
      .then((data) => {
        if (!isCurrent) return;
        setQuestions(data);
        setLoadFailed(false);
        setErrorMessage("");
      })
      .catch((error) => {
        if (!isCurrent) return;
        console.error(error);
        setQuestions([]);
        setLoadFailed(true);
        setErrorMessage(`Could not load questions. Check that JSON Server is running on port 5000. ${error.message}`);
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const retryFetchQuestions = () => {
    setLoading(true);
    setLoadFailed(false);
    setErrorMessage("");
    fetchQuestions();
  };

  const stats = useMemo(() => {
    const total = questions.length;
    const solved = questions.filter((question) => question.status === "Solved").length;
    const revise = questions.filter((question) => question.status === "To Revise").length;
    const unsolved = questions.filter((question) => question.status === "Not Solved").length;
    const solvedPercent = total ? Math.round((solved / total) * 100) : 0;

    return { total, solved, revise, unsolved, solvedPercent };
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch =
        question.title.toLowerCase().includes(search.toLowerCase()) ||
        (question.notes || "").toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || question.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "All" || question.difficulty === selectedDifficulty;
      const matchesStatus =
        selectedStatus === "All" || question.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
    });
  }, [questions, search, selectedCategory, selectedDifficulty, selectedStatus]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
    setSelectedStatus("All");
  };

  const openCreateForm = () => {
    setEditingId(null);
    setFormData(defaultForm());
    setIsFormOpen(true);
  };

  const openEditForm = (question) => {
    setEditingId(question.id);
    setFormData({
      title: question.title,
      category: question.category,
      difficulty: question.difficulty,
      status: question.status,
      notes: question.notes || "",
      lastPracticed: question.lastPracticed || getToday(),
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = formData.title.trim();
    if (!trimmedTitle || !formData.category || !formData.difficulty || !formData.status) {
      alert("Question title, category, difficulty and status are required.");
      return;
    }

    const payload = {
      ...formData,
      title: trimmedTitle,
      notes: formData.notes.trim(),
      lastPracticed: formData.lastPracticed || new Date().toISOString().slice(0, 10),
    };

    try {
      const response = editingId
        ? await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        : await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      if (!response.ok) throw new Error(`Save failed with HTTP ${response.status}`);

      setIsFormOpen(false);
      setEditingId(null);
      setFormData(defaultForm());
      await fetchQuestions();
    } catch (error) {
      console.error("Save failed", error);
      setErrorMessage(`Unable to save the question. ${error.message}`);
    }
  };

  const handleDeleteQuestion = async (id) => {
    const confirmed = window.confirm("Delete this question permanently?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Delete failed with HTTP ${response.status}`);
      if (selectedQuestion && selectedQuestion.id === id) {
        setSelectedQuestion(null);
      }
      await fetchQuestions();
    } catch (error) {
      console.error("Delete failed", error);
      setErrorMessage(`Unable to delete the question. ${error.message}`);
    }
  };

  const handleStatusUpdate = async (id, nextStatus) => {
    const currentQuestion = questions.find((question) => question.id === id);
    if (!currentQuestion) return;

    try {
      const nextDate = getToday();
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: nextStatus,
          lastPracticed: nextDate,
        }),
      });
      if (!response.ok) throw new Error(`Status update failed with HTTP ${response.status}`);

      if (selectedQuestion && selectedQuestion.id === id) {
        setSelectedQuestion({
          ...selectedQuestion,
          status: nextStatus,
          lastPracticed: nextDate,
        });
      }

      await fetchQuestions();
    } catch (error) {
      console.error("Status update failed", error);
      setErrorMessage(`Unable to update question status. ${error.message}`);
    }
  };

  return (
    <div className="app-shell">
      <Header search={search} setSearch={setSearch} />

      <main className="dashboard-page">
        {errorMessage && (
          <div className="error-banner" role="alert">
            <span>{errorMessage}</span>
            <button type="button" onClick={retryFetchQuestions}>Retry</button>
          </div>
        )}
        <div className="page-header-row">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h2>Practice Overview</h2>
          </div>
          <button type="button" className="primary-btn" onClick={openCreateForm}>
            + Add Question
          </button>
        </div>

        <SummaryCards {...stats} />
        <FilterBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          categories={categoryOptions}
          difficultyOptions={DIFFICULTY_OPTIONS}
          statusOptions={STATUS_OPTIONS}
          onReset={resetFilters}
        />

        {loading ? (
          <div className="loading-box">Loading questions...</div>
        ) : loadFailed ? (
          <div className="empty-state error-state" role="status">
            <h3>Could not reach your question bank.</h3>
            <p>Start JSON Server, then retry the connection.</p>
          </div>
        ) : (
          <QuestionTable
            questions={filteredQuestions}
            onView={setSelectedQuestion}
            onEdit={openEditForm}
            onDelete={handleDeleteQuestion}
            onStatusChange={handleStatusUpdate}
          />
        )}
      </main>

      <QuestionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingId={editingId}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        categoryOptions={categoryOptions}
        difficultyOptions={DIFFICULTY_OPTIONS}
        statusOptions={STATUS_OPTIONS}
      />
      <QuestionDetails
        question={selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
        onStatusChange={handleStatusUpdate}
      />
    </div>
  );
}
