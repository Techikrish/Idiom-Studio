import SwiftUI

struct FeedView: View {
    @StateObject private var model = FeedModel()

    var body: some View {
        NavigationStack {
            List {
                if model.isLoading {
                    ProgressView("Loading")
                } else if let error = model.errorMessage {
                    Text(error)
                        .foregroundStyle(.red)
                } else if model.items.isEmpty {
                    ContentUnavailableView(
                        "Nothing here yet",
                        systemImage: "tray",
                        description: Text("New items will appear here.")
                    )
                } else {
                    ForEach(model.items) { item in
                        Text(item.title)
                            .font(.body)
                    }
                }
            }
            .navigationTitle("Feed")
        }
    }
}
