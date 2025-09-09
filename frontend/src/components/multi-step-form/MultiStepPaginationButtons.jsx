

export default function MultiStepPaginationButtons({onClick, text}) {
  return (
    <div>
  <button
              className="btn px-4 py-2 fw-semibold btn-nav-alt btn-outline-dark"
              onClick={onClick}

            >
            {text}
            </button>
    </div>
  )
}
