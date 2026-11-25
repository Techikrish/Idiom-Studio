import SwiftUI

struct FeedView: View {
    @StateObject private var viewModel = FeedViewModel()

    var body: some View {
        NavigationStack {
            LazyVStack(spacing: 12) {
                ForEach(viewModel.posts) { post in
                    PostCard(post: post)
                }
            }
            .navigationTitle("Feed")
        }
    }
}
