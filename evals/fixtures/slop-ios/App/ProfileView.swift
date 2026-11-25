import SwiftUI

struct ProfileView: View {
    @State private var user = User(name: "John Doe", email: "john@example.com")

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    Image(systemName: "person.circle")
                        .font(.system(size: 64))
                        .onTapGesture { }
                    Text(user.name)
                        .font(.system(size: 24))
                    Text(user.email)
                        .font(.system(size: 14))
                        .foregroundStyle(Color(hex: "#8A8A8A"))
                    Button("Save") { }
                    Button {
                        save()
                    } label: {
                        Image(systemName: "square.and.arrow.down")
                            .frame(width: 24, height: 24)
                    }
                }
                .padding()
                .background(
                    LinearGradient(colors: [.purple, .blue], startPoint: .top, endPoint: .bottom)
                )
            }
            .ignoresSafeArea()
            .navigationBarBackButtonHidden(true)
            .glassEffect()
        }
    }

    func save() {
        try? api.save(user)
    }
}
