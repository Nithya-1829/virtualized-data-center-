
import { useState } from "react";
import "./App.css";

function App() {
  const [vms, setVms] = useState([
    {
      id: 1,
      name: "Web Server",
      os: "Ubuntu Linux",
      cpu: 25,
      memory: 40,
      status: "Running",
    },
    {
      id: 2,
      name: "Database Server",
      os: "Windows Server",
      cpu: 55,
      memory: 65,
      status: "Running",
    },
    {
      id: 3,
      name: "Application Server",
      os: "Ubuntu Linux",
      cpu: 0,
      memory: 0,
      status: "Stopped",
    },
  ]);

  const running = vms.filter(
    (vm) => vm.status === "Running"
  ).length;

  const avgCpu =
    vms.length > 0
      ? Math.round(
          vms.reduce((sum, vm) => sum + vm.cpu, 0) /
            vms.length
        )
      : 0;

  const totalMemory = vms.reduce(
    (sum, vm) => sum + vm.memory,
    0
  );

  function toggleVM(id) {
    setVms((previous) =>
      previous.map((vm) =>
        vm.id === id
          ? {
              ...vm,
              status:
                vm.status === "Running"
                  ? "Stopped"
                  : "Running",
              cpu: vm.status === "Running" ? 0 : 30,
              memory: vm.status === "Running" ? 0 : 45,
            }
          : vm
      )
    );
  }

  function addVM() {
    const id = Date.now();

    setVms((previous) => [
      ...previous,
      {
        id,
        name: `Virtual Machine ${previous.length + 1}`,
        os: "Ubuntu Linux",
        cpu: 20,
        memory: 30,
        status: "Running",
      },
    ]);
  }

  function deleteVM(id) {
    setVms((previous) =>
      previous.filter((vm) => vm.id !== id)
    );
  }

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">
            INFRASTRUCTURE MANAGEMENT
          </p>
          <h1>Virtualized Data Center</h1>
          <p className="subtitle">
            Monitor and manage your virtual machines
          </p>
        </div>

        <span className="live-badge">
          ● System Online
        </span>
      </header>

      <main>
        <section className="summary">
          <div className="stat-card">
            <span>Total Virtual Machines</span>
            <h2>{vms.length}</h2>
            <p>Configured instances</p>
          </div>

          <div className="stat-card">
            <span>Running Machines</span>
            <h2>{running}</h2>
            <p>Active instances</p>
          </div>

          <div className="stat-card">
            <span>Average CPU Usage</span>
            <h2>{avgCpu}%</h2>
            <div className="progress">
              <div style={{ width: `${avgCpu}%` }} />
            </div>
          </div>

          <div className="stat-card">
            <span>Memory Allocation</span>
            <h2>{totalMemory}%</h2>
            <div className="progress">
              <div
                style={{
                  width: `${Math.min(totalMemory, 100)}%`,
                }}
              />
            </div>
          </div>
        </section>

<section className="machines-section">
  <div className="section-heading">
    <div>
      <h2>Resource Utilization</h2>
      <p>CPU and memory usage of each virtual machine.</p>
    </div>
  </div>

  <div className="machine-grid">
    {vms.map((vm) => (
      <article className="machine-card" key={`resource-${vm.id}`}>
        <h3>{vm.name}</h3>
        <p className="os">CPU: {vm.cpu}%</p>
        <div className="progress">
          <div style={{ width: `${vm.cpu}%` }} />
        </div>
        <p className="os">Memory: {vm.memory}%</p>
        <div className="progress">
          <div style={{ width: `${vm.memory}%`, background: "#16a085" }} />
        </div>
      </article>
    ))}
  </div>
</section>

        <section className="machines-section">
          <div className="section-heading">
            <div>
              <h2>Virtual Machines</h2>
              <p>
                View instance details and control their status.
              </p>
            </div>

            <button
              className="add-button"
              onClick={addVM}
            >
              + Add Virtual Machine
            </button>
          </div>

          <div className="machine-grid">
            {vms.map((vm) => (
              <article
                className="machine-card"
                key={vm.id}
              >
                <div className="machine-top">
                  <div className="server-icon">▦</div>

                  <span
                    className={
                      vm.status === "Running"
                        ? "status running"
                        : "status stopped"
                    }
                  >
                    {vm.status}
                  </span>
                </div>

                <h3>{vm.name}</h3>
                <p className="os">{vm.os}</p>

                <div className="resource">
                  <div>
                    <span>CPU Usage</span>
                    <strong>{vm.cpu}%</strong>
                  </div>
                  <div className="progress">
                    <div
                      style={{ width: `${vm.cpu}%` }}
                    />
                  </div>
                </div>

                <div className="resource">
                  <div>
                    <span>Memory Usage</span>
                    <strong>{vm.memory}%</strong>
                  </div>
                  <div className="progress">
                    <div
                      style={{ width: `${vm.memory}%` }}
                    />
                  </div>
                </div>

                <div className="vm-actions">
                  <button
                    className={
                      vm.status === "Running"
                        ? "stop-button"
                        : "start-button"
                    }
                    onClick={() => toggleVM(vm.id)}
                  >
                    {vm.status === "Running"
                      ? "Stop VM"
                      : "Start VM"}
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => deleteVM(vm.id)}
                  >
                    Delete VM
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer>
          Virtualized Data Center Simulation · Resource
          Monitoring Dashboard
        </footer>
      </main>
    </div>
  );
}

export default App;
