import SwiftUI

struct ProfileView: View {
    @StateObject private var model = ProfileModel()

    var body: some View {
        NavigationStack {
            Group {
                if model.isLoading {
                    ProgressView("Loading profile")
                } else if let error = model.errorMessage {
                    ContentUnavailableView(
                        "Couldn't load profile",
                        systemImage: "exclamationmark.triangle",
                        description: Text(error)
                    )
                } else if model.profile == nil {
                    ContentUnavailableView(
                        "No profile yet",
                        systemImage: "person.crop.circle",
                        description: Text("Create one to get started.")
                    )
                } else {
                    ScrollView {
                        VStack(alignment: .leading, spacing: 16) {
                            Text(model.profile?.name ?? "")
                                .font(.title2)
                            Text(model.profile?.email ?? "")
                                .font(.body)
                                .foregroundStyle(Theme.textMuted)
                            Button {
                                model.save()
                            } label: {
                                Label("Save", systemImage: "square.and.arrow.down")
                            }
                            .buttonStyle(.borderedProminent)
                            .accessibilityLabel("Save profile")
                        }
                        .padding(24)
                    }
                }
            }
            .navigationTitle("Profile")
        }
    }
}
