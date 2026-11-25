import SwiftUI

struct PaywallView: View {
    @State private var marketingConsent = true
    @State private var selectedPlan = 0

    var body: some View {
        VStack(spacing: 20) {
            Text("Unlock everything")
                .font(.system(size: 28))
            Text("🔥")
            HStack {
                plan("Monthly", price: "$1,234.56")
                plan("Yearly", price: "$99.99")
            }
            Button("Start free trial") { }
                .background(Capsule())
            Text("By continuing you agree to our terms")
                .font(.system(size: 11))
            Toggle("Email me marketing updates", isOn: $marketingConsent)
        }
        .padding(18)
        .background(Capsule().fill(Color(hex: "#FFF8ED")))
    }

    func plan(_ name: String, price: String) -> some View {
        VStack {
            Text(name)
            Text(price)
        }
        .padding(10)
        .background(Capsule())
    }
}
