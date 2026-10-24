type WorkflowStep = {
  label: string;
  emphasis?: boolean;
};

const beforeSteps: WorkflowStep[] = [
  { label: "Candidate provides referee details" },
  { label: "Recruiter follows up outside the platform" },
  { label: "Outcome managed across separate steps" },
];

const afterSteps: WorkflowStep[][] = [
  [{ label: "Candidate provides referee details" }],
  [
    { label: "Existing screening activity" },
    { label: "Reference check", emphasis: true },
  ],
  [{ label: "Each activity advances independently" }],
];

function Step({ label, emphasis = false }: WorkflowStep) {
  return (
    <div className={`workflow-comparison__step${emphasis ? " workflow-comparison__step--emphasis" : ""}`}>
      {label}
    </div>
  );
}

function Arrow() {
  return (
    <span className="workflow-comparison__arrow" aria-hidden="true">
      ↓
    </span>
  );
}

function WorkflowPanel({
  title,
  steps,
}: {
  title: string;
  steps: WorkflowStep[] | WorkflowStep[][];
}) {
  return (
    <section className="workflow-comparison__panel" aria-labelledby={`${title}-title`}>
      <h3 id={`${title}-title`} className="workflow-comparison__title type-eyebrow">
        {title}
      </h3>
      <div className="workflow-comparison__flow">
        {steps.map((step, index) => (
          <div key={index}>
            {Array.isArray(step) && step.length > 1 ? (
              <div className="workflow-comparison__parallel">
                {step.map((parallelStep) => (
                  <Step key={parallelStep.label} {...parallelStep} />
                ))}
              </div>
            ) : (
              <Step {...(Array.isArray(step) ? step[0] : step)} />
            )}
            {index < steps.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function WorkflowComparison() {
  return (
    <figure className="workflow-comparison">
      <WorkflowPanel title="before" steps={beforeSteps} />
      <WorkflowPanel title="after" steps={afterSteps} />
    </figure>
  );
}
