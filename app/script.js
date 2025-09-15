const n = 7;
const { matrix, multiply, inv } = math;
const submit_btn = document.getElementById("submitBtn");
const delete_btn = document.getElementById("deleteBtn");
const result_field = document.getElementById("result");
const inps = [
  document.getElementById("s1"),
  document.getElementById("s2"),
  document.getElementById("s3"),
  document.getElementById("s4"),
  document.getElementById("s5"),
  document.getElementById("s6"),
  document.getElementById("s7"),
  document.getElementById("s8"),
  document.getElementById("s9"),
  document.getElementById("s10"),
  document.getElementById("s11"),
  document.getElementById("s12"),
  document.getElementById("s13"),
  document.getElementById("s14"),
];
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('Service Worker registriert mit Scope:', registration.scope);
      })
      .catch(function(error) {
        console.log('Service Worker Registrierung fehlgeschlagen:', error);
      });
  });
}
let koeffizienten = {
  belastungskoeffizienten: {
    a1: 0,
    a2: 0,
  },
  wiederbelastungskoeffizienten: {
    a1: 0,
    a2: 0,
  },
};
let sigma = {
  belastungssigma: [0.08, 0.16, 0.24, 0.32, 0.4, 0.45, 0.5],
  wiederbelastungssigma: [0.0, 0.08, 0.16, 0.24, 0.32, 0.4, 0.45],
};
let s = {
  belastungss: [0, 0, 0, 0, 0, 0, 0],
  wiederbelastungss: [0, 0, 0, 0, 0, 0, 0],
};
let EV1 = 0.0;
let EV2 = 0.0;
let EV2__EV1 = 0.0;
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  calculate();
});

function wiederbelastungskoeffizientenberechnung() {

  const sum1 = sigma.wiederbelastungssigma.reduce((a, b) => a + b, 0);
  const sum2 = sigma.wiederbelastungssigma.reduce((a, b) => a + b * b, 0);
  const sum3 = sigma.wiederbelastungssigma.reduce((a, b) => a + b * b * b, 0);
  const sum4 = sigma.wiederbelastungssigma.reduce((a, b) => a + b * b * b * b, 0);

  const sumS = s.wiederbelastungss.reduce((a, b) => a + b, 0);
  const sumS1 = s.wiederbelastungss.reduce(
    (a, b, i) => a + b * sigma.wiederbelastungssigma[i],
    0
  );
  const sumS2 = s.wiederbelastungss.reduce(
    (a, b, i) => a + b * sigma.wiederbelastungssigma[i] * sigma.wiederbelastungssigma[i],
    0
  );

  const A = matrix([
    [n, sum1, sum2],
    [sum1, sum2, sum3],
    [sum2, sum3, sum4],
  ]);

  const b = matrix([[sumS], [sumS1], [sumS2]]);

  const x = multiply(inv(A), b);

  console.log("a0 =", x.get([0, 0]));
  koeffizienten.wiederbelastungskoeffizienten.a1 = x.get([1, 0]);
  koeffizienten.wiederbelastungskoeffizienten.a2 = x.get([2, 0]);
}

function belastungskoeffizientenberechnung() {

  const sum1 = sigma.belastungssigma.reduce((a, b) => a + b, 0);
  const sum2 = sigma.belastungssigma.reduce((a, b) => a + b * b, 0);
  const sum3 = sigma.belastungssigma.reduce((a, b) => a + b * b * b, 0);
  const sum4 = sigma.belastungssigma.reduce((a, b) => a + b * b * b * b, 0);

  const sumS = s.belastungss.reduce((a, b) => a + b, 0);
  const sumS1 = s.belastungss.reduce(
    (a, b, i) => a + b * sigma.belastungssigma[i],
    0
  );
  const sumS2 = s.belastungss.reduce(
    (a, b, i) => a + b * sigma.belastungssigma[i] * sigma.belastungssigma[i],
    0
  );

  const A = matrix([
    [n, sum1, sum2],
    [sum1, sum2, sum3],
    [sum2, sum3, sum4],
  ]);

  const b = matrix([[sumS], [sumS1], [sumS2]]);

  const x = multiply(inv(A), b);

  console.log("a0 =", x.get([0, 0]));
  koeffizienten.belastungskoeffizienten.a1 = x.get([1, 0]);
  koeffizienten.belastungskoeffizienten.a2 = x.get([2, 0]);
}

function calculateEV1_EV2() {
  EV1 = (1.5*150)/(koeffizienten.belastungskoeffizienten.a1+koeffizienten.belastungskoeffizienten.a2*0.5)*100
  EV2 = (1.5*150)/(koeffizienten.wiederbelastungskoeffizienten.a1+koeffizienten.wiederbelastungskoeffizienten.a2*0.5)*100
  EV2__EV1 = EV2/EV1
}



function calculate() {
  console.log(1);

  EV1 = 0;
  EV2 = 0;
  EV2__EV1 = 0;
  for (let i = 0; i < 7; i++) {
    s.belastungss[i] = parseFloat(inps[i].value.replace(",", ".")) || 0;
  }
  for (let i = 0; i < 7; i++) {
    s.wiederbelastungss[i] =
      parseFloat(inps[i + 7].value.replace(",", ".")) || 0;
  }

  belastungskoeffizientenberechnung();
  wiederbelastungskoeffizientenberechnung()
  calculateEV1_EV2()

  result_field.innerHTML = `EV1=${EV1.toFixed(2)}<br>
                            EV2=${EV2.toFixed(2)} <br>
                            EV2/EV1=${EV2__EV1.toFixed(2)}`;
}

delete_btn.addEventListener("click", () => {
  for (const inp of inps) {
    inp.value = ""
  }
})