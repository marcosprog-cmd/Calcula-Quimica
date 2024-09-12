const atomicWeights = {
    H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.01, N: 14.007, O: 16.00,
    F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974,
    S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867,
    V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546,
    Zn: 65.38, Ga: 69.723, Ge: 72.63, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798,
    Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224, Nb: 92.906, Mo: 95.95, Tc: 98.00,
    Ru: 101.07, Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41, In: 114.82, Sn: 118.71,
    Sb: 121.76, Te: 127.60, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33, La: 138.91,
    Ce: 140.12, Pr: 140.91, Nd: 144.24, Pm: 145.00, Sm: 150.36, Eu: 151.96, Gd: 157.25,
    Tb: 158.93, Dy: 162.50, Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.05, Lu: 174.97,
    Hf: 178.49, Ta: 180.95, W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08,
    Au: 196.97, Hg: 200.59, Tl: 204.38, Pb: 207.2, Bi: 208.98, Po: 209.00, At: 210.00,
    Rn: 222.00, Fr: 223.00, Ra: 226.00, Ac: 227.00, Th: 232.04, Pa: 231.04, U: 238.03,
    Np: 237.00, Pu: 244.00, Am: 243.00, Cm: 247.00, Bk: 247.00, Cf: 251.00, Es: 252.00,
    Fm: 257.00, Md: 258.00, No: 259.00, Lr: 262.00, Rf: 267.00, Db: 270.00, Sg: 271.00,
    Bh: 270.00, Hs: 277.00, Mt: 278.00, Ds: 281.00, Rg: 282.00, Cn: 285.00, Nh: 286.00,
    Fl: 289.00, Mc: 290.00, Lv: 293.00, Ts: 294.00, Og: 294.00
};
// não queira saber o quão chato foi colocar todos os elementos aqui :(

function updateForm() {
    const calculationType = document.getElementById("calculationType").value;
    const formContainer = document.getElementById("form-container");
    const descriptionContainer = document.getElementById("description-container");
    formContainer.innerHTML = "";
    descriptionContainer.innerHTML = "";

    if (calculationType === "mol") {
        formContainer.innerHTML = `
            <label for="formula">Fórmula química:</label>
            <input type="text" id="formula" placeholder="Digite a fórmula (ex: H2O)">

            <label for="mass">Massa:</label>
            <input type="number" id="mass" placeholder="Digite a massa">
            
            <label for="massUnit">Unidade de Massa:</label>
            <select id="massUnit">
                <option value="g">g</option>
                <option value="mg">mg</option>
                <option value="kg">kg</option>
            </select>
        `;
        descriptionContainer.innerHTML = `
            <strong>Mol:</strong> Um mol é a quantidade de substância que contém exatamente 6,022 × 10²³ entidades elementares (como átomos ou moléculas).
            <br><strong>Fórmula:</strong> Mol = Massa (g) / Massa Molar (g/mol)
        `;
    } else if (calculationType === "molarity") {
        formContainer.innerHTML = `
            <label for="moles">Mols de soluto (mol):</label>
            <input type="number" id="moles" placeholder="Digite o número de mols">
            
            <label for="volume">Volume da solução:</label>
            <input type="number" id="volume" placeholder="Digite o volume da solução">
            
            <label for="volumeUnit">Unidade de Volume:</label>
            <select id="volumeUnit">
                <option value="L">L</option>
                <option value="mL">mL</option>
            </select>
        `;
        descriptionContainer.innerHTML = `
            <strong>Molaridade:</strong> A molaridade é a concentração de uma solução expressa como o número de mols de soluto por litro de solução.
            <br><strong>Fórmula:</strong> Molaridade (M) = Mols de soluto (mol) / Volume da solução (L)
        `;
    } else if (calculationType === "molality") {
        formContainer.innerHTML = `
            <label for="moles">Mols de soluto (mol):</label>
            <input type="number" id="moles" placeholder="Digite o número de mols">
            
            <label for="massSolvent">Massa do solvente:</label>
            <input type="number" id="massSolvent" placeholder="Digite a massa do solvente">
            
            <label for="massSolventUnit">Unidade de Massa:</label>
            <select id="massSolventUnit">
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="mg">mg</option>
            </select>
        `;
        descriptionContainer.innerHTML = `
            <strong>Molalidade:</strong> A molalidade é a concentração de uma solução expressa como o número de mols de soluto por quilograma de solvente.
            <br><strong>Fórmula:</strong> Molalidade (m) = Mols de soluto (mol) / Massa do solvente (kg)
        `;
    }
}

function calculate() {
    const calculationType = document.getElementById("calculationType").value;
    let result = 0;

    if (calculationType === "mol") {
        const formula = document.getElementById("formula").value;
        const mass = parseFloat(document.getElementById("mass").value);
        const massUnit = document.getElementById("massUnit").value;
        
        let molarMass = calculateMolarMass(formula);
        let massInGrams = convertToGrams(mass, massUnit);
        
        result = massInGrams / molarMass;
        document.getElementById("result").innerText = `Resultado: ${result.toFixed(2)} mol`;
    } else if (calculationType === "molarity") {
        const moles = parseFloat(document.getElementById("moles").value);
        const volume = parseFloat(document.getElementById("volume").value);
        const volumeUnit = document.getElementById("volumeUnit").value;
        
        let volumeInLiters = convertToLiters(volume, volumeUnit);
        
        result = moles / volumeInLiters;
        document.getElementById("result").innerText = `Resultado: ${result.toFixed(2)} mol/L`;
    } else if (calculationType === "molality") {
        const moles = parseFloat(document.getElementById("moles").value);
        const massSolvent = parseFloat(document.getElementById("massSolvent").value);
        const massSolventUnit = document.getElementById("massSolventUnit").value;
        
        let massSolventInKg = convertToKg(massSolvent, massSolventUnit);
        
        result = moles / massSolventInKg;
        document.getElementById("result").innerText = `Resultado: ${result.toFixed(2)} mol/kg`;
    }
}

function calculateMolarMass(formula) {
    let molarMass = 0;
    let regex = /([A-Z][a-z]*)(\d*)/g;
    let match;

    while ((match = regex.exec(formula)) !== null) {
        let element = match[1];
        let count = parseInt(match[2] || "1", 10);
        molarMass += (atomicWeights[element] || 0) * count;
    }

    return molarMass;
}

function convertToGrams(mass, unit) {
    if (unit === "mg") return mass / 1000;
    if (unit === "kg") return mass * 1000;
    return mass; // essa vai pra g
}

function convertToLiters(volume, unit) {
    if (unit === "mL") return volume / 1000;
    return volume; // essa vai pra L
}

function convertToKg(mass, unit) {
    if (unit === "g") return mass / 1000;
    if (unit === "mg") return mass / 1000000;
    return mass; // essa vai pra kg
}

//e ai pai, tá onde?

updateForm();