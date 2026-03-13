function FilterBar({ filter, setFilter }) {
  return (
    <div className="filter-bar">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={filter === "watched" ? "active" : ""}
        onClick={() => setFilter("watched")}
      >
        Watched
      </button>

      <button
        className={filter === "unwatched" ? "active" : ""}
        onClick={() => setFilter("unwatched")}
      >
        Unwatched
      </button>
    </div>
  );
}

export default FilterBar;