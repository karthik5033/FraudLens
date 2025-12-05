export type ModelOutput = {
    risk: number
    fraud_type?: string | null
    cluster?: string | null
    explanation?: string | null
}

export type FuseInput = {
    nlp: ModelOutput
    transaction: ModelOutput
    gnn: ModelOutput
    behavior: ModelOutput
}

export type FuseResult = {
    risk: number
    fraud_type: string
    explanation: string
}

/**
 * Clean weighted fusion engine.
 */
export function fuseScores(input: FuseInput): FuseResult {
    const { nlp, transaction, gnn, behavior } = input

    // 1️⃣ Normalize missing model results
    const safe = (n?: number) => (typeof n === "number" ? n : 0)

    const nlpRisk = safe(nlp.risk)
    const txnRisk = safe(transaction.risk)
    const gnnRisk = safe(gnn.risk)
    const behRisk = safe(behavior.risk)

    // 2️⃣ Weighted combination
    const finalRisk =
        0.30 * nlpRisk +
        0.35 * txnRisk +
        0.20 * gnnRisk +
        0.15 * behRisk

    // 3️⃣ Determine fraud type priority
    const fraudType =
        nlp.fraud_type ||
        transaction.fraud_type ||
        gnn.cluster ||
        "unknown"

    // 4️⃣ Generate explanation using a simple reasoning engine
    const explanation = buildExplanation({
        nlpRisk,
        txnRisk,
        gnnRisk,
        behRisk,
        fraudType,
        nlpExplanation: nlp.explanation,
        gnnCluster: gnn.cluster,
    })

    return {
        risk: round(finalRisk),
        fraud_type: fraudType,
        explanation,
    }
}

function round(n: number) {
    return Math.min(1, Math.max(0, parseFloat(n.toFixed(3))))
}

/**
 * Auto-generates a human-friendly fraud explanation.
 */
function buildExplanation({
    nlpRisk,
    txnRisk,
    gnnRisk,
    behRisk,
    fraudType,
    nlpExplanation,
    gnnCluster,
}: {
    nlpRisk: number
    txnRisk: number
    gnnRisk: number
    behRisk: number
    fraudType: string
    nlpExplanation?: string | null
    gnnCluster?: string | null
}): string {
    let reasons: string[] = []

    if (nlpRisk > 0.6)
        reasons.push(nlpExplanation || "Suspicious scam-related language detected")

    if (txnRisk > 0.6)
        reasons.push("Amount pattern indicates possible refund / verification scam")

    if (gnnRisk > 0.6 && gnnCluster)
        reasons.push(`UPI/domain linked to known fraud network (${gnnCluster})`)

        if (behRisk > 0.5)
            reasons.push("User behavior suggests hesitation typical in scam scenarios")
    
        if (reasons.length === 0)
            reasons.push("No significant fraud indicators detected")
    
        return reasons.join(" | ")
    }
